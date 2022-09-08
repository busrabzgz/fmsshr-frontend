import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, CustomInput } from "reactstrap";
import React from "react";
import axios from "axios";
import Header from "components/Headers/Header.js";
import { useRef, useState, useEffect, useContext } from 'react';

const GETADVERTS_URL = "http://localhost:8080/adverts";

const Adverts = () => {
    const [adverts, setAdverts] = useState([]);
    const [allowEdit, setAllowEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkUser();
        getAdverts();
    }, []);

    const getAdverts = async () => {
        setLoading(true);
        const response = axios.get(GETADVERTS_URL);

        let data;
        await response.then((result) => {
            return data = result.data;
        })
        setAdverts(data);
        setLoading(false);
    }

    const checkUser = () => {
        if (sessionStorage.getItem('roleName') === 'admin') {
            setAllowEdit(true);
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstCard = indexOfLastPost - postsPerPage;
    //const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
        <Header backgroundColor="bg-gradient-success"/>
        <Col className="col-md-12">
        <Container className="mt--7 mr--7" fluid>
            <Row>
                <Col className="order-xl-1" xl="10">
                    <Card className="bg-secondary shadow">
                        <CardBody>
                            <Form>
                                <h6 className="heading-small text-muted mb-4">
                                    İlanlar / Ayrıntıları görüntülemek için ilanın üzerine tıklayınız.
                                </h6>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <Input style={{width: "80%"}}
                                                    type="text"
                                                    placeholder="İlan ara"
                                                >
                                                    
                                                </Input>

                                            </FormGroup>
                                        </Col>
                                        <Col lg="2">
                                        <CustomInput 
                                            type="checkbox" 
                                            id="checkbox-remember-me" 
                                            label="Aktif İlanlar"
                                            
                                            />
                                        </Col>
                                        <Row>
                                            <FormGroup>
                                                <Button className="bg-gradient-success text-white border-success  h-100"
                                                >
                                                    Oluştur
                                                </Button>
                                                <Button className="bg-gradient-danger text-white border-danger h-100"

                                                >
                                                    Kaldır
                                                </Button>
                                                <Button className="bg-gradient-orange text-white border-orange h-100"

                                                >
                                                    Düzenle
                                                </Button>
                                            </FormGroup>
                                        </Row>
                                    </Row>
                                    <Row>
                                        <Col lg="4">
                                            <Card>
                                                <CardBody>
                                                    
                                                    <Row>
                                                        <div className="col">
                                                            <CardTitle
                                                            tag="h2"
                                                            >
                                                                Java Developer
                                                            </CardTitle>
                                                            <hr className="my-1" />
                                                        </div>
                                                        
                                                        <Row>
                                                        <img className="ml-7" src={require("../../assets/img/cards/java-card.png")} style={{maxWidth: "50%"}} alt="card-png"></img>
                                                        </Row>
                                                        <Col>
                                                        
                                                        <Row >
                                                        <Col>
                                                            <Button className="text-white border-info btn-info btn-block h-100"
                             
                                                            
                                                            >
                                                            Birini Öner
                                                            </Button>
                                                        </Col>
                                                        </Row>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Col>
        </>
    );
};

export default Adverts;