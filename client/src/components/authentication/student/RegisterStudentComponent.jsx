import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const studentValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    program: Yup.string().required('Program is required')
});

const initialStudentValues = {
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    program: '',
    currentSemester: '1',
    currentYear: new Date().getFullYear().toString()
};

const RegisterStudentComponent = () => {
    const handleStudentSubmit = (values) => {
        console.log('Student Data:', values);
    };

    return (
        <section id="authentication-section" className="container-fluid mt-4 pt-4" style={{ height: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Student Registration</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={initialStudentValues}
                                validationSchema={studentValidationSchema}
                                onSubmit={handleStudentSubmit}
                            >
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
                                        <label htmlFor="student-register-gender">Gender</label>
                                        <Field as="select" className="form-control" id="student-register-gender" name="gender">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="student-register-program">Program</label>
                                        <Field type="text" className="form-control" id="student-register-program" name="program" />
                                        <ErrorMessage name="program" component="div" className="text-danger" />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Register Student</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterStudentComponent;