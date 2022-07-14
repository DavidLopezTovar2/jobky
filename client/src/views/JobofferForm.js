import React from 'react';
import Header from '../components/Header';
import OfferForm from '../components/OfferForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import jobofferPicture from '../assets/imgs/joboffer.png';

const JobofferForm = () => {

    return (
        <>
            <Header />
            <Container className="mt-3 mb-3">
            <Row>
                    <h1 className="d-flex align-items-center justify-content-center">Registra aqui tu nueva oferta laboral</h1>
                </Row>
                <Row>
                    <Col sm={4} className="bg-primary">
                    <img className="chef-image m-3 text-center justify-content-center" src={jobofferPicture} alt='Chef Logo' />
                    </Col>
                    <Col sm={8} className="text-center">
                        <OfferForm />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default JobofferForm;