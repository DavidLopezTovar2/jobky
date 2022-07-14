import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getUsers } from '../services/user.service';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import UsersTable from '../components/UsersTable';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col'

const Users = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsersFromService();
    }, []);

    const getUsersFromService = async () => {
        try {
            const usersFromService = await getUsers();
            setUsers(usersFromService.data.users)
        } catch (err) {
            console.log(err);
            alert();
        }
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={5}>
                        <h1 className="mt-4 d-flex align-items-center justify-content-center">Usuarios dentro de nuestra base de datos</h1>
                    </Col>
                    <Col className='d-flex align-items-center' xs={2}>
                        <Button onClick={() => navigate('/home')}>
                            Home
                        </Button>
                    </Col>
                </Row>
                <UsersTable users={users} props='users' />                
            </Container>
        </>
    )
}

export default Users;