import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

import * as authActions from '../../../redux/actions/auth';

import styles from "./Signup.module.scss";
import { useNavigate } from "react-router-dom";

YupPassword(Yup);

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot be longer than 50 characters")
    .required("This field is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot be longer than 50 characters")
    .required("This field is required"),

  email: Yup.string().email().required("This field is required"),

  password: Yup.string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters long")
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minSymbols(1, 'Password must contain at least 1 special character'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  useEffect(() => {
    dispatch(authActions.setCurrentUser({ message: null }));
  }, []);

  const message = useSelector((state) => state.auth.message);

  const handleSubmit = (values) => {
    const { firstName, lastName, email, password } = values;
    dispatch(authActions.signUp({
      user: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
      callback: () => navigate("/")
    }));
  };

  return (
    <main className={styles.signup_form}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text"></Field>
          <ErrorMessage name="firstName" component="span" className="err-msg"></ErrorMessage>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text"></Field>
          <ErrorMessage name="lastName" component="span" className="err-msg"></ErrorMessage>
          <label htmlFor="email">Email</label>
          <Field name="email" type="email"></Field>
          <ErrorMessage name="email" component="span" className="err-msg"></ErrorMessage>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password"></Field>
          <ErrorMessage name="password" component="span" className="err-msg"></ErrorMessage>
          <button type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
      {message && (
        <div className={styles.message}>{message}</div>
      )}
    </main>
  );
}

export default Signup;
