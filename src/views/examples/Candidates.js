import { useState,useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    UncontrolledTooltip, Table, Media
} from "reactstrap";
import React from 'react';
import axios from "axios";
// core components
import Header from "components/Headers/Header.js";
const candidateUrl="http://localhost:8080/oldEvents/holdingCandidates"

const Candidates = () => {
    const [candidates,setCandidates]=useState([]);
    const [candidate, setCandidate] = useState([]);
    const [candidateId,setCandidateId]= useState(0);


    useEffect(() => {
        getPendingCandidates();
    }, []);



    const getPendingCandidates = () => {
        axios.get(`http://localhost:8080/oldEvents/holdingCandidates`).then((response)=>{
            console.log(response.data);
            setCandidates(response.data);

        })
            .catch(error => console.error(`Error: ${error}`));
    }
    const getAllCandidates =() => {

    }




    const viewCv = (number) => {
        if(number !== 0){
            window.open(`http://localhost:8080/candidates/${number}/fileView`, '_blank', 'noopener,noreferrer');
            axios.get(`http://localhost:8080/candidates/${number}/fileView`).then((response)=>{
                console.log(response.data) ;
            })
        }
    }




    return (
        <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Adaylar</h3>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">İSİM</th>
                                        <th scope="col">Ünvan</th>
                                        <th scope="col">Telefon</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">CV</th>
                                        <th scope="col">Durumu</th>
                                        <th scope="col" />
                                    </tr>
                                    </thead>




                                    {candidates.map((candidate)=>(
                                        <tr>
                                            <th scope="row">

                          <span className="mb-0 text-sm">
                            {candidate?.firstName + " " + candidate?.lastName}
                          </span>




                                            </th>
                                            <td>{candidate?.tag}</td>
                                            <td>{candidate?.phone}</td>
                                            <td>{candidate?.email}</td>
                                            <td>{candidate?.email}</td>

                                        </tr>




                                    ))}





                                </Table>


                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Candidates;
