import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJob } from '../services/joboffer.services';
import Swal from 'sweetalert2'
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OfferForm from '../components/OfferForm';
import Image from 'react-bootstrap/esm/Image';

const EdiJoboffer = () => {

    const { id } = useParams();
    const [joboffer, setJoboffer] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        id && getJobFromService();
    }, [id]);

    const getJobFromService = async () => {
        try {
            const jobFromService = await getJob(id);
            setJoboffer(jobFromService.data.joboffer);
        } catch (err) {
            Swal.fire({
                title: '¡Ups!',
                text: 'No pudimos traer la oferta',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
            navigate('/joboffers');
        }
    }

    return (
        <>
            <Header props="joboffer" />
            <Container className="mt-3 mb-3">
                <Row>
                    <h1 className="d-flex align-items-center justify-content-center">Editar la oferta laboral {joboffer?.position}</h1>
                </Row>
                <Row>
                    <Col sm={4} className="bg-primary">
                        <Image className="chef-image" src={joboffer?.image} />
                    </Col>
                    <Col sm={8} className="text-center">
                        {joboffer &&  <OfferForm props={joboffer} />}
                        {/* <OfferForm props={joboffer}/> */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EdiJoboffer;