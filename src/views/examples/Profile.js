import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";



const Profile = () => {
  
  const [personInfo, setPersonInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [level, setLevel] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [identityNumber, setIdentityNumber] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [role, setRole] = useState('');


  useEffect(() =>{
    var userId = localStorage.getItem("userId");
    setUserId(userId);
    axios("http://localhost:8080/users/"+userId)
    .then((res) => setPersonInfo(res.data))
    .finally(() => setLoading(false));
  },[]);
  
  var startingDate = personInfo?.value?.startingDateOfEmployment;
  var arrayDate = startingDate?.split('-');

  var birthday = personInfo?.value?.birthday;
  var arrayBirthday = birthday?.split('-');
  
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
              </Row>
              {/* <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader> */}
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  {/* <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">{personInfo}</span>
                        <span className="description">Maaşı</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div> */}
                </Row>
                <div className="text-center">
                  <h3>
                    {personInfo?.value?.firstName + " " + personInfo?.value?.lastName}
                    <span className="font-weight-light">, {personInfo?.value?.age} </span>
                  </h3>
                  {/* <div className="h5 font-weight-300" st>
                    <i className="ni location_pin mr-2" />
                    <p style={{fontSize:"16px"}}>
                    {personInfo?.value?.phoneNumber}
                    </p>
                  </div> */}
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {personInfo?.value?.department} - FMSS
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {personInfo?.value?.title}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    İşe başlama tarihi: {arrayDate?.[2] + "."+ arrayDate?.[1]+ "."+arrayDate?.[0]}
                  </div>
                  {
                    personInfo?.value?.manager !== (personInfo?.value?.firstName + " " + personInfo?.value?.lastName) ?   
                    <div>
                    <i className="ni education_hat mr-2" />
                    Yöneticisi: {personInfo?.value?.manager}
                  </div> : null
                  }
                  <div>
                    <i className="ni education_hat mr-2" />
                    Maaşı: {personInfo?.value?.salary}₺
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Level: {personInfo?.value?.level}
                  </div>
                  <hr className="my-4" />
                  
                  <h3>
                    Kişisel Bilgiler
                  </h3>
                  <p >
                    T.C Kimlik No: {personInfo?.value?.identityNumber}
                  </p>
                  <p >
                    Doğum Tarihi: {arrayBirthday?.[2] + "."+ arrayBirthday?.[1]+ "."+arrayBirthday  ?.[0]}
                  </p>
                  
                  <hr className="my-4" />
                  <h3>
                    İletişim Bilgileri
                  </h3>
                  <p style={{align:"left"}}>
                    Adres: {personInfo?.value?.address} {personInfo?.value?.city +"/"+personInfo?.value?.country +" " + personInfo?.value?.postalCode}
                  </p>
                  <p >
                    Telefon Numarası: {personInfo?.value?.phoneNumber}
                  </p>
                  <p >
                    E-Posta: {personInfo?.value?.email}
                  </p>
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Hesap Bilgilerimi Güncelle</h3>
                  </Col>
                  {/* <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <Button
                    style={{width:"150px", alignItems:"center" }}
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                Profili düzenle
              </Button>     
                </Form>      
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
