// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5  d-flex align-items-center"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span style={{backgroundColor: "#e5322d"}} className="mask opacity-8" />
        {/* Header container */}
      </div>
    </>
  );
};

export default UserHeader;
