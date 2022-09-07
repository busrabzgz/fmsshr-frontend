import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch, Redirect, Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import routes from "routes.js";

const AdminNavbar = (props) => {
  const [personInfo, setPersonInfo] = useState([]);

  const [userId, setUserId] = useState();

  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
    setSuccess(true);
    }

  useEffect(() =>{
    var userId = localStorage.getItem("userId");
    setUserId(userId);
    axios("http://localhost:8080/users/"+userId)
    .then((res) => setPersonInfo(res.data))
  },[]);
  return (
    <>
    {success ? (
            <section>
                <p>
                    (<Switch>
                      <Redirect from="*" to="/auth/login" />
                    </Switch>)
                </p>
            </section>
        ) : (
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            {/* <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Ara" type="text" />
              </InputGroup>
            </FormGroup> */}
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/profile_photos/profile.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {personInfo?.value?.firstName + " " + personInfo?.value?.lastName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Hoşgeldin!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Profilim</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Ayarlar</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Aktivite</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Destek</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem  onClick={handleSubmit}>
                  <i className="ni ni-user-run" />
                  <span>Çıkış Yap</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
        )}
    </>
  );
};

export default AdminNavbar;
