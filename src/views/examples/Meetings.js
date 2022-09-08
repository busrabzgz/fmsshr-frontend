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
const meetingUrl="http://localhost:8080/upcomingMeetings"

const Meetings = () => {
  const [meetings,setMeetings]=useState([]);
  const [candidate, setCandidate] = useState([]);
  const [candidateId,setCandidateId]= useState(0);


  useEffect(() => {
    getUpcomingMeetings() ;
  }, []);



  const getUpcomingMeetings = () => {
    axios.get(`${meetingUrl}`).then((response)=>{
      console.log(response.data);
      setMeetings(response.data);

    })
        .catch(error => console.error(`Error: ${error}`));
  }




  const viewCv = (number) => {
    if(number !== 0){
      window.open(`http://localhost:8080/candidates/${number}/fileView`, '_blank', 'noopener,noreferrer');
      axios.get(`http://localhost:8080/candidates/${number}/fileView`).then((response)=>{
        console.log(response.data);
      })
    }
  }




  return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Yaklaşan Toplantılar</h3>
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">Aday İsmi</th>
                      <th scope="col">Toplantı Başlangıç Saati</th>
                      <th scope="col">Toplantı Bitiş Saati</th>
                      <th scope="col">Toplantı Linki</th>
                      <th scope="col">Toplantının Durumu</th>
                      <th scope="col" />
                    </tr>
                    </thead>




                    {meetings.map((meeting)=>(
                        <tr>
                          <th scope="row">

                          <span className="mb-0 text-sm">
                            {meeting?.firstName + " " + meeting?.lastName}
                          </span>




                          </th>
                          <td>{meeting?.date}</td>
                          <td>{meeting?.endDate}</td>
                          <td>{meeting?.meetingResponse?.start_url}</td>
                          <td>{meeting?.isOnline ? "Online mülakat" : "Yüz yüze mülakat"}</td>
                          <td>

                            <button className="btn btn-primary" onClick={() => viewCv(meeting?.candidateId)}>Cv görüntüle</button>

                          </td>
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

export default Meetings;
