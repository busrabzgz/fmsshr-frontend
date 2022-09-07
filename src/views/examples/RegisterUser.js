// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Label,
    Alert
  } from "reactstrap";
  // core components
import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import Header from "components/Headers/Header.js";

const SIGNUP_URL = "http://localhost:8080/users/sign-up";
const GETDEPARTMENT_URL = "http://localhost:8080/departments";
const GETROLES_URL = "http://localhost:8080/";
                        
const RegisterUser = () => {
  const [value, setValue]= useState(new Date().toISOString())
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [level, setLevel] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startingDate, setStartingDate] = useState('');
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
  const [departmentList, setDepartmentList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [backgroundAlert, setBackgroundAlert] = useState('bg-gradient-default');

  useEffect( () =>  {
      getDepartments();  
  }, [departmentList.length === 0]);

  const getDepartments = async () => {
    const response = axios.get(GETDEPARTMENT_URL);

    let data;
    await response.then(result => {
      return data = result.data;
    });
    setDepartmentList(data);
  };

  const getRoles = async () => {
    const response = axios.get(GETROLES_URL);
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
      
        setPwd(phoneNumber.slice(phoneNumber.length-4))
        debugger;
         try {
            let signuprequest = JSON.stringify({
                level: level, 
                firstName: name,
                lastName: surname,
                identityNumber: identityNumber,
                birthday: birthday,
                phoneNumber: phoneNumber,
                startingDateOfEmployment: startingDate,
                salary: salary,
                department: department,
                address: address,
                title: title,
                city: city,
                country: country,
                postalCode: postalCode,
                password: pwd,
                role: role,
                email: email,
              });

            const response = axios.post(SIGNUP_URL, signuprequest, {
                headers: { 'Content-Type': 'application/json' },
            });

            let data;
            await response.then(result => {
                return data = result.data;
            });
            
            setErrMsg(false);
            setBackgroundAlert('bg-gradient-success');
            setSuccess(true);

         } catch (err) {
            if (!err?.response) {
                setErrMsg('Server hatası');
            } else if (err.response?.status === 400) {
                setErrMsg('Girdiğiniz bilgileri kontrol ediniz');
                setBackgroundAlert('bg-gradient-danger');
            } else if (err.response?.status === 500) {
                setErrMsg('Eksik bilgi');
            } else {
                setErrMsg('Kaydetme işlemi başarısız');
            }
         }
        }

    return (
      <>
        <Header backgroundColor={backgroundAlert}/>
        <Col>
        <Container className="mt--7 mr--9" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Kullanıcı bilgileri
                    </h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              İsim
                            </label>
                            <Input onChange={(e) => setName(e.target.value)} value={name} required
                              className="form-control-alternative"
                              id="input-first-name"
                              placeholder="İsim"
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
                              Soyisim
                            </label>
                            <Input onChange={(e) => setSurname(e.target.value)} value={surname} required
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Soyisim"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              E-posta Adresi
                            </label>
                            <Input onChange={(e) => setEmail(e.target.value)} value={email} required
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Örn: keremmican@fmss.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Kimlik No
                            </label>
                            <Input onChange={(e) => setIdentityNumber(e.target.value)} value={identityNumber} required
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="***********"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Maaş
                            </label>
                            <Input onChange={(e) => setSalary(e.target.value)} value={salary} required
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="******"
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
                              İşe Başlama Tarihi
                            </label>
                            <Input onChange={(e) => setStartingDate(e.target.value)} value={startingDate} required
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Örn: 2020-01-19"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>  
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Unvan
                            </label>
                            <Input onChange={(e) => setTitle(e.target.value)} value={title} required
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Örn: Junior"
                              type="text"
                            />
                          </FormGroup>
                   
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-role"
                            >
                              Rol
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-level"
                                type={"select"}
                                placeholder="Kullanıcı"
                                onChange={(e) => setRole(e.target.value)} value={role} required
                             >
                            <option value="" hidden></option>
                            <option value="user">Kullanıcı</option>
                            <option value="admin">Admin</option>
                            </Input>
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-level"
                            >
                              Seviye
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-level"
                                type="select"
                                placeholder="A-1"
                                size="6"
                                onChange={(e) => setLevel(e.target.value)} value={level} required
                             >
                            <option value="" hidden></option>
                            <option>J-1</option>
                            <option>J-2</option>
                            <option>J-3</option>
                            <option>S-1</option>
                            <option>S-2</option>
                            <option>S-3</option>
                            <option>M-1</option>
                            <option>M-2</option>
                            <option>M-3</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                      <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-role"
                            >
                              Departman
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-level"
                                type={"select"}
                                placeholder="Departman"
                                onChange={(e) => setDepartment(e.target.value)} value={department} required
                             >
                             {departmentList.map(department => <option>
                              {department['name']}
                             </option>)}
                             </Input>
                          </FormGroup>
                          </Col>
                          <Col lg="6">
                          <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Doğum Tarihi
                            </label>
                            <Input onChange={(e) => setBirthday(e.target.value)} value={birthday} required
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Örn: 2020-01-19"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      İletişim Bilgileri
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Adres
                            </label>
                            <Input onChange={(e) => setAddress(e.target.value)} value={address} required
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Cevizli Mah. Tugay Yolu Cad. Ofisim İstanbul A Blok Kat 5"
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
                              Şehir
                            </label>
                            <Input onChange={(e) => setCity(e.target.value)} value={city} required
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="İstanbul"
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
                              Ülke
                            </label>
                            <Input onChange={(e) => setCountry(e.target.value)} value={country} required
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="Türkiye"
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
                              Posta kodu
                            </label>
                            <Input onChange={(e) => setPostalCode(e.target.value)} value={postalCode} required
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="34000"
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
                              htmlFor="input-country"
                            >
                              Telefon Numarası
                            </label>
                            <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="+90***"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="8">
                          <FormGroup>
                        <Button style={{width: "75%"}} className="mt-4 ml-6"
                            color="info"
                            onClick={handleSubmit}
                         >
                        Kaydet
                        </Button>
                        </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                <Alert color="danger" isOpen={errMsg !== ''}>
                      {errMsg}
                </Alert>
              </Card>
            </Col>
          </Row>
        </Container>
        </Col>
      </>
    );
  };
  
  export default RegisterUser;