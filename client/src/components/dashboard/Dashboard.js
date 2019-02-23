import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import "../App.css";
import MapView from "../Map";
import Sidebar from "../Sidebar";

const API_KEY = process.env.REACT_APP_TRAILS_API_KEY;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -111.85,
      zoom: 10,
      isLoaded: false,
      trails: [],
      todos: [],
      disabled: [],
      maxDist: "",
      star: "",
      maxRes: ""
    };
    this.disableButton = this.disableButton.bind(this);
    this.mapItem = this.mapItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628&maxResults=2&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  filterTrails() {
    fetch(
      `https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628&maxDistance=${
        this.state.maxDist
      }&minStars=${this.state.star}&maxResults=${
        this.state.maxRes
      }&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  handleSubmit(e) {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    this.filterTrails();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  mapItem = item => {
    this.setState({
      lat: item.latitude,
      lng: item.longitude,
      zoom: 16
    });
  };

  disableButton(item) {
    this.setState({
      todos: [...this.state.todos, { name: item.name, id: item.id }],
      disabled: [...this.state.disabled, item.id]
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { error, isLoaded } = this.state;
    const { user } = this.props.auth;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Sidebar
            disabled={this.state.disabled}
            trails={this.state.trails}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            mapItem={this.mapItem}
            disableButton={this.disableButton}
            todos={this.todos}
          />
          <MapView
            trails={this.state.trails}
            zoom={this.state.zoom}
            lat={this.state.lat}
            lng={this.state.lng}
          />
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text grey-text text-darken-1">
                    You are logged into a full-stack{" "}
                    <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                  </p>
                </h4>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
