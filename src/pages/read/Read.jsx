import React, { Component } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";
// import article from "./data.json";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions";
class Read extends Component {
  state = {
    article: {},
    loading: true,
    reviews: [],
    errMsg: "",
  };

  getArticle = async (id) => {
    const url = process.env.REACT_APP_API_URL;
    try {
      let res = await fetch(`${url}/articles/${id}`);
      // let reviews = await fetch(`${url}/articles/${id}/reviews`);
      if (!res.ok) {
        const { errors } = await res.json();
        throw new Error(errors);
      }
      const data = await res.json();
      setTimeout(() => this.setState({ article: data, loading: false }), 500);
    } catch (error) {
      console.log(error.message);
      this.setState({ errMsg: error.message });
    }
  };
  componentDidMount = () => {
    const id = this.props.match.params.slug;
    this.getArticle(id);
  };
  render() {
    const { article, loading } = this.state;
    return (
      <Container className="article-container">
        {loading ? (
          <h1 className="row align-items-center">
            <Spinner animation="border" className="mr-2" />
            Loading...
          </h1>
        ) : (
          <>
            <h1>{article.title}</h1>
            <Row style={{ marginTop: 20, marginBottom: 20 }}>
              <Col xs={1}>
                <Image
                  style={{ width: 50, height: 50 }}
                  src={article.author.img}
                  roundedCircle
                />
              </Col>
              <Col>
                {article.author.name}
                <p>
                  {new Date(article.updatedAt).toDateString()} ·{" "}
                  {Math.floor(article.content.length / 600)} min read
                </p>
              </Col>
              <Col>
                <div
                  style={{
                    fontSize: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <IoLogoTwitter />
                  <IoLogoLinkedin />
                  <IoLogoFacebook />
                  <IoBookmarkOutline />
                </div>
              </Col>
            </Row>
            <p>{article.content}</p>
            <Reactions />
          </>
        )}
      </Container>
    );
  }
}

export default withRouter(Read);
