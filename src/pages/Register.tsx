import React from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { LockOutlined } from "@mui/icons-material";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import axiosInstance from '../api/axiosInstance'
  import { Formik } from 'formik';
  import * as Yup from 'yup';

  const Register = (data: any) => {
    const [message, setMessage] = useState("");    
    
    return (
      <>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Register</Typography>
            <Box sx={{ mt: 3 }}>
              <Formik
                initialValues={{ username: '', name: '', password: '' }}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const response = await axiosInstance.post('/register', values);
                    setMessage(response.data.message);
                    resetForm();
                  } catch (error) {
                    console.error('Error registering user :', error);
                  }
                }}

                validationSchema={Yup.object().shape({
                  username: Yup.string()
                    .email()
                    .required('Email is required'),
                  name: Yup.string()
                    .required('Name is required'),
                  password: Yup.string()
                    .min(8, 'Password must be at least 8 characters long')
                    .matches(/[a-z]/, 'Password must contain at least 1 letter')
                    .matches(/[0-9]/, 'Password must contain at least 1 number')
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special character')
                    .required('Password is required'),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    handleReset,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                     <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                        label="Enter your name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.name && touched.name) && errors.name}
                        fullWidth
                      />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        label="Enter your email"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.username && touched.username) && errors.username}
                        fullWidth
                      />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        label="Enter your password"
                        name="password"
                        value={values.password}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.password && touched.password) && errors.password}
                        fullWidth
                      />
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <h4>{message}</h4>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                  <Button
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
                    </form>
                  );
                }}
              </Formik>             
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  };
  
  export default Register;