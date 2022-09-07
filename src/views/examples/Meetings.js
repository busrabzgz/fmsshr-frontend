/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  const [candidateId,setCandidateId]= useState([]);


  useEffect(() => {
    getUpcomingMeetings();
  }, []);
  const getUpcomingMeetings = () => {
      axios.get(`${meetingUrl}`).then((response)=>{
      console.log(response.data.value);
      setMeetings(response.data.value);






    })
        .catch(error => console.error(`Error: ${error}`));




  }
  const viewCv = () => {
    axios.get(`http://localhost:8080/${candidateId}/fileView`).then((response)=>{
      console.log(response.data.value);

    })
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
                <h3 className="mb-0">Upcoming Meetings</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                  <th scope="col">Candidate Name</th>
                  <th scope="col">Meeting Start Time</th>
                  <th scope="col">Meeting End Time</th>
                  <th scope="col">Meeting Link</th>
                  <th scope="col">Status of Meeting</th>
                  <th scope="col" />
                </tr>
                </thead>




                  {meetings.map((meeting)=>(
                    <tr>
                      <th scope="row">

                          <span className="mb-0 text-sm" /*onClick={() => (setCandidateId(meeting?.candidateId),viewCv())}*/>
                            {meeting?.firstName + " " + meeting?.lastName}

                          </span>




                      </th>
                      <td>{meeting?.date}</td>
                      <td>{meeting?.endDate}</td>
                      <td>{meeting?.meetingResponse?.start_url}</td>
                      <td>{meeting?.isOnline ? "Online mülakat" : "Yüz yüze mülakat"}</td>
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
