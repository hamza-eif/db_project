import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import * as Yup from 'yup';

const studentValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    program: Yup.object().required('Program is required'),
    degreeType: Yup.object().required('Degree Type is required'),
    semester: Yup.object().required('Semester is required'),
    section: Yup.object().required('Section is required')
});

const initialStudentValues = {
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    program: null,
    degreeType: null,
    semester: null,
    section: null
};

const RegisterStudentComponent = ({ onSubmit }) => {
    const [programOptions, setProgramOptions] = useState([]);
    const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProgramData = async () => {
            setLoading(true); // Set loading to true initially
            setError(''); // Reset error state
            try {
                const programResponse = await axios.get('http://localhost:3001/api/student/programs');
                if (Array.isArray(programResponse.data)) {
                    setProgramOptions(programResponse.data.map(program => ({ value: program.prog_id, label: program.name })));
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching program data:', error);
                setError('Failed to load program data. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchProgramData();
    }, []);

    const handleProgramChange = async (option, setFieldValue) => {
        setFieldValue('program', option);
        setFieldValue('degreeType', null);
        setFieldValue('semester', null);
        setFieldValue('section', null);
        setDegreeTypeOptions([]);
        setSemesterOptions([]);
        setSectionOptions([]);

        try {
            const degreeTypeResponse = await axios.get(`http://localhost:3001/api/student/dec/${option.value}`);
            setDegreeTypeOptions(degreeTypeResponse.data.map(degree => ({ value: degree.dec_id, label: degree.name })));
        } catch (error) {
            console.error('Error fetching degree type data:', error);
        }
    };

    const handleDegreeTypeChange = async (option, setFieldValue) => {
        setFieldValue('degreeType', option);
        setFieldValue('semester', null);
        setFieldValue('section', null);
        setSemesterOptions([]);

        try {
            const semesterResponse = await axios.get(`http://localhost:3001/api/student/get_sem`);
            setSemesterOptions(semesterResponse.data.map(semester => ({ value: semester.sem_id, label: `Semester ${semester.name}` })));
        } catch (error) {
            console.error('Error fetching semester data:', error);
        }
    };

    const handleSemesterChange = async (option, setFieldValue) => {
        setFieldValue('semester', option);
        setFieldValue('section', null);
        setSectionOptions([]);

        try {
            const sectionResponse = await axios.get(`http://localhost:3001/api/student/get_sec`);
            setSectionOptions(sectionResponse.data.map(section => ({ value: section.sec_id, label: section.name })));
        } catch (error) {
            console.error('Error fetching section data:', error);
        }
    };

    const handleStudentSubmit = (values) => {
        const studentData = {
            name: values.name,
            email: values.email,
            password: values.password,
            dob: values.dob,
            gender: values.gender,
            programId: values.program.value,
            degreeTypeId: values.degreeType.value,
            semesterId: values.semester.value,
            sectionId: values.section.value
        };

        // Pass data to the parent component
        onSubmit(studentData);
    };

    return (
        <section id="authentication-section" className="container-fluid mt-4 pt-4">
            <div className="row justify-content-center">
                <div className="col-lg-12 col-md-8 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Student Registration</h3>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <div className="text-danger">{error}</div>
                            ) : (
                                <Formik
                                    initialValues={initialStudentValues}
                                    validationSchema={studentValidationSchema}
                                    onSubmit={handleStudentSubmit}
                                >
                                    {({ setFieldValue, values }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="student-register-name">Name</label>
                                                <Field type="text" className="form-control" id="student-register-name" name="name" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-email">Email</label>
                                                <Field type="email" className="form-control" id="student-register-email" name="email" />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-password">Password</label>
                                                <Field type="password" className="form-control" id="student-register-password" name="password" />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-dob">Date of Birth</label>
                                                <Field type="date" className="form-control" id="student-register-dob" name="dob" />
                                                <ErrorMessage name="dob" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <div role="group">
                                                    <label>
                                                        <Field type="radio" name="gender" value="male" />
                                                        Male
                                                    </label>
                                                    <label>
                                                        <Field type="radio" name="gender" value="female" />
                                                        Female
                                                    </label>
                                                    <ErrorMessage name="gender" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-program">Program</label>
                                                <Select
                                                    id="student-register-program"
                                                    options={programOptions}
                                                    onChange={(option) => handleProgramChange(option, setFieldValue)}
                                                    onBlur={() => setFieldValue('program', values.program)} // Prevent blur issues
                                                />
                                                <ErrorMessage name="program" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-degree-type">Degree Type</label>
                                                <Select
                                                    id="student-register-degree-type"
                                                    options={degreeTypeOptions}
                                                    onChange={(option) => handleDegreeTypeChange(option, setFieldValue)}
                                                    onBlur={() => setFieldValue('degreeType', values.degreeType)} // Prevent blur issues
                                                />
                                                <ErrorMessage name="degreeType" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-semester">Semester</label>
                                                <Select
                                                    id="student-register-semester"
                                                    options={semesterOptions}
                                                    onChange={(option) => handleSemesterChange(option, setFieldValue)}
                                                    onBlur={() => setFieldValue('semester', values.semester)} // Prevent blur issues
                                                />
                                                <ErrorMessage name="semester" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="student-register-section">Section</label>
                                                <Select
                                                    id="student-register-section"
                                                    options={sectionOptions}
                                                    onChange={(option) => setFieldValue('section', option)}
                                                    onBlur={() => setFieldValue('section', values.section)} // Prevent blur issues
                                                />
                                                <ErrorMessage name="section" component="div" className="text-danger" />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Next</button>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterStudentComponent;
