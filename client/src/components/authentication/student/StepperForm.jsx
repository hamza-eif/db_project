import React, { useEffect, useState } from 'react';
import { Stepper } from 'react-dynamic-stepper';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import * as Yup from 'yup';

const FormStepper = () => {
  const [stepStatus, setStepStatus] = useState([false, false, false]);
  const [formData, setFormData] = useState({
    personalInfo: {},
    programInfo: {}
  });

  const steps = [
    {
      header: {
        label: 'Step 1: Personal Info',
      },
      content: (
        <PersonalInfo 
          formData={formData.personalInfo} 
          setFormData={setFormData} 
          setStepStatus={setStepStatus} 
        />
      ),
      isError: false,
      isWarning: false,
      isComplete: stepStatus[0],
    },
    {
      header: {
        label: 'Step 2: Program Info',
      },
      content: (
        <ProgramInfo 
          formData={formData.programInfo} 
          setFormData={setFormData} 
          setStepStatus={setStepStatus} 
        />
      ),
      isError: false,
      isWarning: false,
      isComplete: stepStatus[1],
    },
    {
      header: {
        label: 'Step 3: Confirmation',
      },
      content: <Confirmation formData={formData} />,
      isError: false,
      isComplete: stepStatus[2],
    },
  ];

  const submitStepper = () => {
    console.log('Final submitted data:', formData);
  };

  return (
    <Stepper
      steps={steps}
      footerData={{
        submitHandler: submitStepper,
      }}
    />
  );
};

const PersonalInfo = ({ formData, setFormData, setStepStatus }) => {
  const initialValues = {
    name: formData.name || '',
    email: formData.email || '',
    password: formData.password || '',
    dob: formData.dob || '',
    gender: formData.gender || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData(prev => ({
          ...prev,
          personalInfo: values
        }));
        setStepStatus(prev => {
          const newStatus = [...prev];
          newStatus[0] = true;
          return newStatus;
        });
      }}
    >
      {() => (
            <div className='container'>
                <div className='row'>
                <Form className='col-lg-4 col-md-8 col-sm-12'>
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
            <label htmlFor="student-register-gender">Gender</label>
            <Field as="select" className="form-control" id="student-register-gender" name="gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Proceed to Next Step</button>
        </Form>
                </div>
            </div>
      )}
    </Formik>
  );
};

const ProgramInfo = ({ formData, setFormData, setStepStatus }) => {
  const [programOptions, setProgramOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const programResponse = await axios.get('http://localhost:3001/api/student/programs');
        setProgramOptions(programResponse.data.map(program => ({ value: program.prog_id, label: program.name })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching program data:', error);
        setLoading(false);
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

  return (
    <Formik
      initialValues={{
        program: formData.program || null,
        degreeType: formData.degreeType || null,
        semester: formData.semester || null,
        section: formData.section || null,
      }}
      validationSchema={Yup.object({
        program: Yup.object().required('Program is required'),
        degreeType: Yup.object().required('Degree Type is required'),
        semester: Yup.object().required('Semester is required'),
        section: Yup.object().required('Section is required'),
      })}
      onSubmit={(values) => {
        setFormData(prev => ({
          ...prev,
          programInfo: values
        }));
        setStepStatus(prev => {
          const newStatus = [...prev];
          newStatus[1] = true;
          return newStatus;
        });
      }}
    >
      {({ setFieldValue, values }) => (
            <div className='container'>
                <div className='row'>
                <Form className='col-lg-6'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="student-register-program">Program</label>
                <Select
                  id="student-register-program"
                  options={programOptions || []}
                  value={values.program}
                  onChange={(option) => handleProgramChange(option, setFieldValue)}
                />
                <ErrorMessage name="program" component="div" className="text-danger" />
              </div>

              {values.program && (
                <div className="form-group">
                  <label htmlFor="student-register-degree-type">Degree Type</label>
                  <Select
                    id="student-register-degree-type"
                    options={degreeTypeOptions || []}
                    value={values.degreeType}
                    onChange={(option) => handleDegreeTypeChange(option, setFieldValue)}
                  />
                  <ErrorMessage name="degreeType" component="div" className="text-danger" />
                </div>
              )}

              {values.degreeType && (
                <div className="form-group">
                  <label htmlFor="student-register-semester">Semester</label>
                  <Select
                    id="student-register-semester"
                    options={semesterOptions || []}
                    value={values.semester}
                    onChange={(option) => handleSemesterChange(option, setFieldValue)}
                  />
                  <ErrorMessage name="semester" component="div" className="text-danger" />
                </div>
              )}

              {values.semester && (
                <div className="form-group">
                  <label htmlFor="student-register-section">Section</label>
                  <Select
                    id="student-register-section"
                    options={sectionOptions || []}
                    value={values.section}
                    onChange={(option) => setFieldValue('section', option)}
                  />
                  <ErrorMessage name="section" component="div" className="text-danger" />
                </div>
              )}
            </>
          )}
          <button type="submit" className="btn btn-primary w-100">Proceed to Next Step</button>
        </Form>
                </div>
            </div>
      )}
    </Formik>
  );
};

const Confirmation = ({ formData }) => {
  return (
    <div className='container'>
      <h3>Confirmation</h3>
      <h5>Personal Information:</h5>
      <p>Name: {formData.personalInfo.name}</p>
      <p>Email: {formData.personalInfo.email}</p>
      <p>Date of Birth: {formData.personalInfo.dob}</p>
      <p>Gender: {formData.personalInfo.gender}</p>
      <h5>Program Information:</h5>
      <p>Program: {formData.programInfo.program?.label}</p>
      <p>Degree Type: {formData.programInfo.degreeType?.label}</p>
      <p>Semester: {formData.programInfo.semester?.label}</p>
      <p>Section: {formData.programInfo.section?.label}</p>
    </div>
  );
};

export default FormStepper;
