import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'
import { Link, useNavigate } from "react-router-dom";
import { Container, CssBaseline, Box, Grid } from '@mui/material';

const Home = () => {
    const [data, setData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
      }, []);
    
    const fetchData = async () => {
        await axiosInstance.get('/user').then((response: any) => {
            setData(response.data.name);
            console.log('success data:', response.data);
          }).catch((error: any) => {
            navigate('/login');
            console.error('Error fetching data:', error);
            return error;
          });
    };

    const logout = async () => {
        localStorage.removeItem('access_token');
    }
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
                <h4>
                    Hello {data}, welcome to Application. 
                </h4>
                <h4>
                    To Logout please click <Link onClick={logout} to={'/login'}>here</Link>. 
                </h4>
                </Box>
            </Container>
        </>
    )
}

export default Home;