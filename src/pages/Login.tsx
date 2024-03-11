import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
          <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values) => {
                  try {
                    const response = await axiosInstance.post('/login', values);
                    localStorage.setItem('access_token', response.data.access_token);
                    navigate('/');
                  } catch (error) {
                    console.error('Error logging in :', error);
                  }
                }}

                validationSchema={Yup.object().shape({
                  username: Yup.string()
                    .email()
                    .required('Email is required'),
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
                  <Button type="submit" disabled={isSubmitting}>
                    Login
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
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
