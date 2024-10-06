import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginComp.css';

const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const initialLoginValues = {
    email: '',
    password: ''
};

const LoginStudentComponent = () => {
    const handleLoginSubmit = (values) => {
        console.log('Login Data:', values);
    };

    return (
        <section id="authentication-section" className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <Formik
                                initialValues={initialLoginValues}
                                validationSchema={loginValidationSchema}
                                onSubmit={handleLoginSubmit}
                            >
                                <Form className="form">
                                    <div className="input-span">
                                        <label htmlFor="student-login-email" className="label">Email</label>
                                        <Field 
                                            type="email" 
                                            className="form-control" 
                                            id="student-login-email" 
                                            name="email" 
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>

                                    <div className="input-span">
                                        <label htmlFor="student-login-password" className="label">Password</label>
                                        <Field 
                                            type="password" 
                                            className="form-control" 
                                            id="student-login-password" 
                                            name="password" 
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>

                                    <div className="span">
                                        <a href="#">Forgot password?</a>
                                    </div>

                                    <input className="submit" type="submit" value="Log in" />

                                    <div className="span mt-2">
                                        Don't have an account? <a href="#">Sign up</a>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginStudentComponent;
