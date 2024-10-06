import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const teacherValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    qualification: Yup.string().required('Qualification is required'),
    specialization: Yup.string().required('Specialization is required'),
    dob: Yup.date().required('Date of Birth is required')
});

const initialTeacherValues = {
    name: '',
    email: '',
    password: '',
    qualification: '',
    specialization: '',
    dob: ''
};

const RegisterTeacherComponent = () => {
    const handleTeacherSubmit = (values) => {
        console.log('Teacher Data:', values);
    };

    return (
        <section id="authentication-section" className="container-fluid mt-4 pt-4" style={{ height: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Teacher Registration</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={initialTeacherValues}
                                validationSchema={teacherValidationSchema}
                                onSubmit={handleTeacherSubmit}
                            >
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="teacher-register-name">Name</label>
                                        <Field type="text" className="form-control" id="teacher-register-name" name="name" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="teacher-register-email">Email</label>
                                        <Field type="email" className="form-control" id="teacher-register-email" name="email" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="teacher-register-password">Password</label>
                                        <Field type="password" className="form-control" id="teacher-register-password" name="password" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="teacher-register-qualification">Qualification</label>
                                        <Field type="text" className="form-control" id="teacher-register-qualification" name="qualification" />
                                        <ErrorMessage name="qualification" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="teacher-register-specialization">Specialization</label>
                                        <Field type="text" className="form-control" id="teacher-register-specialization" name="specialization" />
                                        <ErrorMessage name="specialization" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="teacher-register-dob">Date of Birth</label>
                                        <Field type="date" className="form-control" id="teacher-register-dob" name="dob" />
                                        <ErrorMessage name="dob" component="div" className="text-danger" />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Register Teacher</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterTeacherComponent;