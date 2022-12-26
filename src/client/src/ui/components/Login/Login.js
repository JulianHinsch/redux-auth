import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as authActions from '../../../redux/actions/auth';

import styles from "./Login.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("This field is required"),
  password: Yup.string().required("This field is required"),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Log In";
  }, []);

  useEffect(() => {
    dispatch(authActions.setCurrentUser({ message: null }));
  }, []);

  const handleSubmit = (values) => {
    const { email, password } = values;
    const redirectTo = _.get(location, "state.from");

    dispatch(authActions.logIn({ credentials: { email, password }, callback: () => navigate(redirectTo) }));
  };

  return (
    <main className={styles.login_form}>
      <h1>Log In</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field name="email" type="email"></Field>
          <ErrorMessage name="email"></ErrorMessage>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password"></Field>
          <ErrorMessage name="password"></ErrorMessage>
          <button type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </main>
  );
}

export default Login;
