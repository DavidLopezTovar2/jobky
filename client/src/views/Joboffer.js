import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { deleteJob, getJob, addVisitsCounter } from '../services/joboffer.services';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2'
import UserByExperience from '../components/UsersByExperience';
import Cookies from 'js-cookie';

const Joboffer = () => {


    const { id } = useParams();
    const [usersRender, setUsersRender] = useState(false);
    const [joboffer, setJoboffer] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        id && getJobFromService();
    }, [id]);

    const editJoboffer = () => {
        navigate(`/joboffers/edit/${joboffer._id}`);
    }

    const renderExperience = () => (
        <>
            <h3 className=" mt-4 font-weight-bold font-italic">Experiencia: </h3>
            {joboffer?.experience}
        </>
    )

    const deleteJoboffer = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0275d8',
            cancelButtonColor: '#d9534f',
            confirmButtonText: 'Si, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteJob(joboffer._id);
                    Swal.fire(
                        '¡Eliminado!',
                        'Tu oferta de trabajo ha sido eliminada',
                        'success'
                    );
                    navigate('/joboffers');
                } catch (err) {
                    Swal.fire({
                        title: '¡Ups!',
                        text: 'No cuentas con los permisos para borrar esta oferta',
                        icon: 'error',
                        confirmButtonColor: '#0275d8'
                    })
                }
            }
        })
    }

    const getJobFromService = async () => {
        let allCookies = Cookies.get('_usertoken')
        console.log(allCookies);
        try {
            const jobFromService = await getJob(id);
            if(jobFromService.data.joboffer){
                setJoboffer(jobFromService.data.joboffer);
                addCounterJob();
            }else {
                navigate('/not-found');
            }  
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

    const addCounterJob = async () => {
        try {
            await addVisitsCounter(id);
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <Header />
            <Container className="mt-5">
                <Row>
                    <Col key={1} md={3} xs={4} className="justify-content-end">
                        <Row>
                            <Button onClick={() => navigate('/joboffers')} className="mt-2 w-50" variant="secondary">Retroceder</Button>
                        </Row>
                        {}
                        <Row>
                            <Button onClick={() => setUsersRender(true)} className="mt-2 w-50 " >Mostrar candidatos</Button>
                        </Row>
                        <Row>
                            <Button onClick={() => deleteJoboffer()} className="mt-2 w-50" variant="danger">Eliminar oferta</Button>
                        </Row>
                        <Row>
                            <Button onClick={() => editJoboffer()} className="mt-2 w-50 " variant="warning">Editar oferta</Button>
                        </Row>
                    </Col>
                    <Col key={2} md={3} xs={4} >
                        <Image src={joboffer?.image} />
                        {joboffer?.experience && renderExperience()}
                        <h6 className="mt-4">Número de visitas: {joboffer?.visits}</h6>
                    </Col>
                    <Col key={3} md={4} xs={6}>
                        <h3 className="font-weight-bold font-italic">Vacante:</h3>
                        {joboffer?.position}
                        <h3 className="font-weight-bold font-italic">Nombre de la empresa:</h3>
                        {joboffer?.company}
                        <h3 className="font-weight-bold font-italic">Descripción:</h3>
                        {joboffer?.description}
                    </Col>
                    <Col key={4} md={3} xs={4} />
                </Row>
                <Row>
                    {usersRender && <UserByExperience experience={joboffer?.experience} />}
                    {/* {usersRender && <UserByExperience experience={joboffer} />} */}
                </Row>
            </Container>
        </>
    )
}

export default Joboffer;