import React from 'react';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import { logout } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useCookies } from "react-cookie";

const Feed = () => {

    const navigate = useNavigate();
    const [cookies] = useCookies(["_usertoken"]);

    const logoutUser = async() => {
        try{
            await logout();
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <>
            <Header/>
            {cookies._usertoken && <p>HEY</p>}
            <Container className="text-center m-5 justify-content-center">
        <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
                <h1>Que gusto tenerte de regreso</h1>
                <h3>¿Qué deseas hacer?</h3>
            </Col>
            <Col xs={4}></Col>
        </Row>
        <Row className="m-5">
            <Col md={3} />
            <Col md={2}>
                <Button onClick={() => logoutUser()}>Logout</Button>
            </Col>
            <Col md={2}>
                <Button onClick={() => navigate('/joboffers')}>Ver ofertas</Button>
            </Col>
            <Col md={2}>
                <Button onClick={() => navigate('/joboffers/create')}>Crear ofertas</Button>
            </Col>
        </Row>
        <Row>
            <Col md={3} />
            <Col md={2}/>
            <Col md={2} >
                <Button onClick={() => navigate('/users')}>Ver usuarios</Button>
            </Col>
            <Col md={2}/>
            
        </Row>
    </Container>
            
        </>
    )
}

export default Feed;