import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Container,
  Image,
  Button,
  OverlayTrigger,
  Popover,
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
  state = { user: {} };
  handleLoginStatus = async (option = "login") => {
    try {
      let token = localStorage.getItem("token");
      let refreshToken = localStorage.getItem("refreshToken");
      let headers = { Authorization: "Bearer " + token };
      const url = process.env.REACT_APP_API_URL;
      const refreshAuthLogic = (failedRequest) =>
        axios({
          url: `${url}/users/refreshToken`,
          method: "POST",
          headers,
          data: { refreshToken },
        }).then((tokenRefreshResponse) => {
          localStorage.setItem("token", tokenRefreshResponse.data.token);
          localStorage.setItem(
            "refreshToken",
            tokenRefreshResponse.data.refreshToken
          );
          failedRequest.response.config.headers["Authorization"] =
            "Bearer " + tokenRefreshResponse.data.token;
          return Promise.resolve();
        });

      createAuthRefreshInterceptor(axios, refreshAuthLogic);
      if (option !== "login") {
        console.log(option);
        const res = await axios({
          method: "POST",
          url: `${url}/users/${option}`,
          headers,
          data: { refreshToken },
        });
        console.log(option, res.ok);
      } else {
        const { data } = await axios({
          method: "GET",
          url: `${url}/users/me`,
          headers,
        });
        this.setState({ user: data.username });
        console.log(this.state.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">User menu</Popover.Title>
      <Popover.Content>
        <Button
          variant="outline-danger"
          onClick={() => this.handleLoginStatus("logout")}
        >
          Logout
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => this.handleLoginStatus("logoutAll")}
        >
          Logout All
        </Button>
      </Popover.Content>
    </Popover>
  );
  componentDidMount = () => {
    localStorage.getItem("token") && this.handleLoginStatus();
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
              {this.state.user.length > 0 ? (
                <Nav.Link className="medium-icon">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={this.popover}
                  >
                    <Button variant="outline-secondary">
                      {this.state.user}
                    </Button>
                  </OverlayTrigger>
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to={"/login"} className="medium-icon">
                  <Button variant="outline-secondary">Login</Button>
                </Nav.Link>
              )}
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
