import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import "./index.scss"


function LaunchCard({ id, mission_name, site_name_long, rocket_name, launch_date_utc, article_link, flickr_images }) {

  return (
    <div className="wrapper">
    <div className="card">
      <img className="card__img" src={flickr_images}/>
      <div className="card__body">
        <h6 className="card__title">{mission_name}</h6>
        <p className="card__description">{site_name_long}</p>
        <p className="card__description">{rocket_name}</p>
        {/* <p className="card__description">{launch_date_utc}</p> */}
        {id === undefined ? <></> : <Card.Link href={`/launch/${id}`}>See More</Card.Link>}
      </div>

    </div>
</div>
    
    // <Card style={{ width: "30%" }} bg="dark" text="warning" className="launchcard-container">
    //   <Card.Img style={{ width: "100%", height: "40vh"}} variant="top" src={flickr_images}  />
    //   <Card.Body className="item">
    //     <Card.Title className="ctitle">{mission_name}</Card.Title>
    //     <Card.Text className="ctext">{site_name_long}</Card.Text>
    //     <Card.Text className="ctext">{rocket_name}</Card.Text>
    //     <Card.Text className="ctext">{launch_date_utc}</Card.Text>
    //     {id === undefined ? <></> : <Card.Link href={`/launch/${id}`}>See More</Card.Link>}
    //     <Row>
    //       <Col>
    //         {/* <a href={article_link} target="_blank">
    //           <Button>Article Link</Button>
    //         </a> */}
    //       </Col>
    //     </Row>
    //   </Card.Body>
    // </Card>

    // </div>
  );
}

export default LaunchCard;
