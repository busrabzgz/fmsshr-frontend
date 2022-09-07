// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
const UserHeader = () => {
  const [personInfo, setPersonInfo] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() =>{
    var userId = localStorage.getItem("userId");
    setUserId(userId);
    axios("http://localhost:8080/users/"+userId)
    .then((res) => setPersonInfo(res.data))
  },[]);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Merhaba {personInfo?.value?.firstName}</h1>
              {/* <p className="text-white mt-0 mb-5">
                Bu sayfada bilgilerinizi görüntüleyebilirsiniz.
              </p> */}
              {/* <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Profili düzenle
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default UserHeader;