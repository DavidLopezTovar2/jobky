import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import { login } from '../services/user.service';
import Swal from 'sweetalert2';

const LoginForm = () => {

    const navigate = useNavigate();

    const [user] = useState({
        email: '',
        password: '',
    })

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Este campo es requerido'),
        password: Yup.string()
            .required('Este campo es requerido')
    });

    const handlerSubmit = async (values) => {
        try {
            await login(values);
            navigate('/home');
        }
        catch (err) {
            Swal.fire({
                title: 'Ups!',
                text: 'Credenciales incorrectas',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
        }
    }

    return (
        <>
            <Header props='login' />
            <Container>
                <Row className="m-6">
                    <h1 className="text-center">Bienvenido a <span className="text-primary font-italic font-weight-bold">JOBKY</span></h1>
                </Row>
                <Row>
                    <Col sm={2} className="bg-primary">
                    </Col>
                    <Col sm={8} className="text-center">
                        <Formik
                            submitForm
                            validationSchema={formSchema}
                            initialValues={user}
                            onSubmit={values => {
                                handlerSubmit(values)
                            }}
                        >
                            {({ errors, getFieldProps }) => (

                                <FormikForm>
                                    <Container>
                                        <div className="mt-3">
                                            <Form.Group controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" placeholder="Email" value={user.email} {...getFieldProps('email')} />
                                            </Form.Group>
                                            {errors.email && (
                                                <div className="d-flex text-danger error-form">
                                                    <p>{errors?.email}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <Form.Group controlId="formPassword">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control type="password" placeholder="Contraseña" value={user.password} {...getFieldProps('password')} />
                                            </Form.Group>
                                            {errors.password && (
                                                <div className="d-flex text-danger error-form">
                                                    <p>{errors?.password}</p>
                                                </div>
                                            )}
                                        </div>
                                        <Button className="mt-3" variant="primary" type="submit">
                                            Iniciar sesión
                                        </Button>
                                    </Container>
                                </FormikForm>
                            )}

                        </Formik>
                    </Col>
                    <Col sm={2} className="bg-primary">
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginForm;