import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import "./index.scss"


function BigLaunchCard({ id, mission_name, site_name_long, rocket_name, launch_date_utc, article_link, flickr_images, details, video_link }) {

  return (
    <Card className="card-detail" style={{ width: "75%" }} bg="dark" text="warning">
      <Card.Img style={{ width: "100%", height: "auto" }} variant="top" src={flickr_images} />
      <Card.Body>
        <Card.Title>{mission_name}</Card.Title>
        <Card.Text>{site_name_long}</Card.Text>
        <Card.Text>{rocket_name}</Card.Text>
        {/* <Card.Text>{launch_date_utc}</Card.Text> */}
        <Card.Text>{details}</Card.Text>
        <Card.Link href={article_link}>Read the article</Card.Link>
        <Card.Link href={video_link}>Watch the video</Card.Link>
        {id === undefined ? <></> : <Card.Link href={`/launch/${id}`}>See More</Card.Link>}
        <Row>
          <Col>
            {/* <a href={article_link} target="_blank">
              <Button>Article Link</Button>
            </a> */}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BigLaunchCard;
