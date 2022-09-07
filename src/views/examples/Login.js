import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
  CustomInput
} from "reactstrap";

import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes.js";

const LOGIN_URL = '/users/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [layoutName, setLayoutName] = useState('');
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);     

    useEffect(() => {
      try {
        if (localStorage.getItem('roleName').length !== 0) {
          setLayoutName("/" + localStorage.getItem('roleName').substring(1, localStorage.getItem('roleName').length-1)+"/index");
          sessionStorage.setItem('token', localStorage.getItem('token'));
          sessionStorage.setItem('userId', localStorage.getItem('userId'));
          sessionStorage.setItem('roleName', localStorage.getItem('roleName'));
          setSuccess(true);
        }
      } catch {

      }
      
    }, []);

    const handleCheck = event => {
      setIsRememberMeChecked(current => !current);
    };

    const getRoutes = (routes) => {
      return routes.map((prop, key) => {
        if (prop.layout === layoutName) {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         try {
            let loginrequest = JSON.stringify({
                email: user, 
                password: pwd});

            const response = axios.post(LOGIN_URL, loginrequest, {
                headers: { 'Content-Type': 'application/json' },
            });

            let data;
            await response.then(result => {
                return data = result.data;
            });
            
            if (isRememberMeChecked === true) {
              localStorage.setItem('token', JSON.stringify(data['token']));
              localStorage.setItem('userId', JSON.stringify(data['userId']));
              localStorage.setItem('roleName', JSON.stringify(data['roleName']));
            }
            
            setRole(data['roleName']);
            setToken(data['token']);
            setLayoutName("/"+data['roleName']);
            sessionStorage.setItem('token', JSON.stringify(data['token']));
            sessionStorage.setItem('userId', JSON.stringify(data['userId']));
            sessionStorage.setItem('roleName', JSON.stringify(data['roleName']));
            setAuth({ user, pwd, role, token });
            setUser('');
            setPwd('');
            setSuccess(true);

         } catch (err) {
            if (!err?.response) {
                setErrMsg('Server hatası');
            } else if (err.response?.status === 400) {
                setErrMsg('E-posta ya da şifre yanlış!');
            } else if (err.response?.status === 401) {
                setErrMsg('Onaylanmamış hesap');
            } else {
                setErrMsg('Giriş işlemi başarısız');
            }
         }
        }
    return (
          <>
          {success ? (
            <section>
                <p>
                    (<Switch>
                      {getRoutes(routes)}
                      <Redirect from="*" to={layoutName} />
                    </Switch>)
                </p>
            </section>
        ) : (
            <Col lg="5" md="7" onSubmit={handleSubmit}>
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required
                          placeholder="Email"
                          type="email"
                          autoComplete="new-email"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(e) => setPwd(e.target.value)} value={pwd} required
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                        />
                      </InputGroup>
                    </FormGroup>
                    <Alert color="danger" isOpen={errMsg !== ''}>
                      {errMsg}
                    </Alert>
                    <CustomInput 
                          type="checkbox" 
                          id="checkbox-remember-me" 
                          label="Beni hatırla" 
                          value={isRememberMeChecked}
                          onChange={handleCheck}
                          />
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                        Giriş Yap
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
        )}
          </>
        )
    }

export default Login;