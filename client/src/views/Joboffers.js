import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJoboffers } from '../services/joboffer.services';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Container from 'react-bootstrap/esm/Container';
import JobofferCard from '../components/JobofferCard';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button';

const Joboffers = () => {

    const [joboffers, setJoboffers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getjoboffersFromService();
    }, []);

    const getjoboffersFromService = async () => {
        try {
            let jobOffersFromService = await getJoboffers();
            console.log(jobOffersFromService.data.joboffers);
            setJoboffers(jobOffersFromService.data.joboffers);
        } catch (err) {
            Swal.fire({
                title: 'Ups!',
                text: 'No pudimos traer las ofertas',
                icon: 'error',
                confirmButtonColor: '#0275d8'
            })
            navigate('/joboffers');
        }
    }

    return (
        <>
            <Header />
            <Container>
                <Row className="mt-4">
                    <Col></Col>
                    <Col className="text-center" xs={5}><h1>Ofertas diponibles</h1></Col>
                    <Col>
                        <Button onClick={() => navigate('/home')}>
                            Home
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {joboffers?.map((joboffer, idx) => (
                        <JobofferCard key={idx} joboffer={joboffer} idx={idx} />
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Joboffers;