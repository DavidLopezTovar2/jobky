import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

const UsersTable = ({ users, props }) => {

    const navigate = useNavigate();

    const viewUser = (id) => {
        navigate(`/user/${id}`)
    }

    const renderUsers = () => {
        if (users.length === 0) {
            return <h5 className="text-danger mt-4 text-center">Lo sentimos, no hay candidatos disponibles para esta posición.</h5>;
        }
        else {
            return <Table className="mt-4" striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '11rem' }}>Nombre</th>
                        <th style={{ width: '11rem' }}>Experience</th>
                        <th>Descripción</th>
                        <th style={{ width: '7rem' }} />
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={idx}>
                            <td>{user.name}</td>
                            <td>{user.experience}</td>
                            <td>{user.description}</td>
                            <td><Button onClick={() => viewUser(user?._id)}>Ver perfil</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        }
    }

    return (
        <>
            {renderUsers()}
        </>
    )
}

export default UsersTable;