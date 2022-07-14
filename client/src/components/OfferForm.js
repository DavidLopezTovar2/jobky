import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { createJoboffer, editJoboofer } from '../services/joboffer.services';
import Swal from 'sweetalert2';

const OfferForm = ({ props }) => {

    const navigate = useNavigate();

    const [joboffer, setJoboffer] = useState({
        position: '',
        company: '',
        image: '',
        description: '',
        experience: ''
    })

    const experience = [
        'Sin experiencia',
        'Junior',
        'Semi senior',
        'Senior',
        'Lider',];

    const startForm = () => {
        setJoboffer(props);
    }

    useEffect(() => {
        props && startForm();
    }, []);


    const offerSchema = Yup.object().shape({
        position: Yup.string()
            .required('Este campo es requerido')
            .min(3, 'Debe tener por lo menos 3 caracteres'),
        company: Yup.string()
            .required('Este campo es requerido'),
        image: Yup.string()
            .required('Este campo es requerido'),
        description: Yup.string()
            .required('Este campo es requerido')
            .min(3, 'Debe tener por lo menos 3 caracteres'),
        experience: Yup.string()
            .required(true, 'Seleccione nivel de experiencia')
            .oneOf(experience, 'Seleccione alguna experiencia')
    });

    const handlerSubmit = async (values) => {
        try {
            props ? await editJoboofer(props._id, values) : await createJoboffer(values);
            props ? Swal.fire({
                text: 'Tu oferta ha sido editada',
                icon: 'success',
                confirmButtonColor: '#0275d8'
            }) : Swal.fire({
                title: '¡Felicidades!',
                text: 'Tu oferta ha sido registrada',
                icon: 'success',
                confirmButtonColor: '#0275d8'
            });
            props ? navigate(`/job/${props._id}`) : navigate(`/joboffers`);
        }
        catch (err) {
            props ? Swal.fire({
                title: 'Ups!',
                text: 'No cuentas con los permisos para editar esta oferta',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            }) : Swal.fire({
                title: 'Ups!',
                text: 'No hemos podido crear tu oferta laboral, intenta de nuevo',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
            navigate(`/job/${props._id}`);
        }
    }

    return (
        <>
            <Container>
                <Formik
                    enableReinitialize
                    submitForm
                    initialValues={joboffer}
                    validationSchema={offerSchema}
                    onSubmit={values => {
                        handlerSubmit(values)
                    }}
                >
                    {({ errors, getFieldProps }) => (

                        <FormikForm>
                            <div>
                                <Form.Group controlId="formPosition">
                                    <Form.Label>Nombre de la posición</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre posición" value={joboffer.position} {...getFieldProps('position')} />
                                </Form.Group>
                                {errors.position && (
                                    <div className="d-flex text-danger error-form">
                                        <p>{errors?.position}</p>
                                    </div>
                                )}
                            </div >
                            <div className="mt-3">

                                <Form.Group controlId="formCompany">
                                    <Form.Label>Nombre de la empresa</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre empresa" value={joboffer.company} {...getFieldProps('company')} />
                                </Form.Group>
                                {errors.company && (
                                    <div className="d-flex text-danger error-form">
                                        <p>{errors?.company}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">
                                <Form.Group controlId="formImage">
                                    <Form.Label>Imagen de la empresa</Form.Label>
                                    <Form.Control type="text" placeholder="Imagen" value={joboffer.image} {...getFieldProps('image')} />
                                </Form.Group>
                                {errors.image && (
                                    <div className="d-flex text-danger error-form">
                                        <p>{errors?.image}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows={3} type="text" placeholder="Descripción" value={joboffer.description} {...getFieldProps('description')} />
                                </Form.Group>
                                {errors.description && (
                                    <div className="d-flex text-danger error-form">
                                        <p>{errors?.description}</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Seleccione nivel de experiencia</Form.Label>
                                        <Form.Select value={joboffer.experience} {...getFieldProps('experience')} >
                                            <option value="Sin experiencia">Sin experiencia</option>
                                            <option value="Junior">Junior</option>
                                            <option value="Semi senior">Semi senior</option>
                                            <option value="Senior">Senior</option>
                                            <option value="Lider">Líder</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {errors.experience && (
                                        <div className="d-flex text-danger error-form">
                                            <p>{errors?.experience}</p>
                                        </div>
                                    )}
                                </div>
                            <Button className="mt-3" variant="primary" type="submit">
                                {props ? 'Editar oferta' : 'Crear oferta'}
                            </Button>
                        </FormikForm>
                    )}

                </Formik>
            </Container>
        </>
    )
}

export default OfferForm;