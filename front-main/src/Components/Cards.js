import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { dataAddedToCards } from "../redux/AsyncAction";
import { resetAddToCardsNotification } from "../redux/AsyncAction";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../CssFile/Color.css";

class Cards extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.dataAddedToCards();
    }, 2000);
  }

  componentWillUnmount() {
    this.props.resetAddToCardsNotification();
  }
  // componentDidMount() {
  //   this.props.dataAddedToCards()            this is used before settimeout
  // }
  componentDidUpdate(prevProps, prevState) {
    // if (this.props.loginMessage === "false") this.props.history.push("/");
  }
  render() {
    return (
      <div>
        {this.props.dataAddedToCardsNotification === true ? (
          <Row xs={1} md={3} className="g-4">
            {this.props.cardData.map((item, index) => (
              <Col key={index}>
                <Card key={index + 1} className="card">
                  <Card.Img
                    variant="top"
                    className="cardImg"
                    src={item.picture.thumbnail}
                    style={{ borderRadius: "50%" }}
                  />
                  <Card.Body className="cardBody">
                    <div
                      className="cardtitlename"
                      style={{
                        width: "70%",
                        marginLeft: "35%",
                        marginTop: "-20%",
                      }}
                    >
                      <Card.Title>
                        {item.name.title +
                          " " +
                          item.name.first +
                          " " +
                          item.name.last}
                      </Card.Title>
                    </div>
                    <Card.Text>
                      <div style={{ width: "70%", marginLeft: "35%" }}>
                        {item.email}
                      </div>
                      <div style={{ width: "70%", marginLeft: "35%" }}>
                        {item.location.city +
                          " , " +
                          item.location.country +
                          " , " +
                          item.location.postcode}
                      </div>
                      <div style={{ width: "70%", marginLeft: "35%" }}>
                        {"Mob-No " + item.phone}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          
            <div className="loader" />
          
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cardData: state.RequestReducer.cardData,
  dataAddedToCardsNotification:
    state.RequestReducer.dataAddedToCardsNotification,
  loginMessage: state.LRequestReducer.loginMessage,
});

const mapDispatchToProps = {
  dataAddedToCards,
  resetAddToCardsNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
