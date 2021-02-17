import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Container,
  Image,
  Button,
} from "react-bootstrap";
import logo from "../../assets/medium_logo.svg";
import {
  IoNotificationsOutline,
  IoBookmarksOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export default class NavBar extends Component {
  handleLoginStatus = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = await axios({
      method: "GET",
      url: `${this.url}/users/me`,
      Authorization: "Bearer" + token,
    });
    this.setState({ user });
    return user ? user.username : "Login";
  };
  refreshAuthLogic = (failedRequest) =>
    axios.post(`${this.url}/users/refeshtoken`).then((tokenRefreshResponse) => {
      localStorage.setItem("token", tokenRefreshResponse.data.token);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token;
      return Promise.resolve();
    });
  createAuthRefreshInterceptor(axios, refreshAuthLogic) {}
  componentDidMount = () => {
    this.handleLoginStatus();
  };
  render() {
    return (
      <Navbar style={{ paddingTop: 24 }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img style={{ height: 54 }} alt="medium-logo" src={logo} />
          </Navbar.Brand>
          <h5 style={{ fontWeight: "bold", marginTop: "0.6em" }}>
            Good Morning
          </h5>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/search">
                <IoSearchOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#home">
                <IoBookmarksOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#link" className="medium-icon">
                <IoNotificationsOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#link" className="medium-icon">
                <Button variant="outline-secondary">Upgrade</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="medium-icon">
                <Button variant="outline-secondary">
                  {this.handleLoginStatus}
                </Button>
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" as="div">
                  <Image
                    style={{ height: 30 }}
                    src="https://strive.school/favicon.ico"
                    roundedCircle
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/new-story">
                    Write a story
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/stories">
                    Stories
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/stats">
                    Stats
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
