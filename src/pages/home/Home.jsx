import React, { Component } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { IoBookmarksOutline } from "react-icons/io5";
import uniqid from "uniqid";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import Footer from "../../components/Footer/Footer";
import PeopleList from "../../components/PeopleList/PeopleList";
import TopicsToFollow from "../../components/TopicsToFollow/TopicsToFollow";
// import articles from "./articles.json";
import "./styles.scss";
export default class Home extends Component {
  state = {
    articles: [],
    restOfArticles: [],
    loading: true,
    links: {},
  };
  url = process.env.REACT_APP_API_URL;
  getArticles = async () => {
    try {
      let res = await fetch(`${this.url}/articles`);
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        setTimeout(
          () => this.setState({ articles: data.articles, loading: false }),
          500
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  getRestOfArticles = async (url = `${this.url}/articles?limit=5&offset=5`) => {
    try {
      let res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.setState({ restOfArticles: data.articles, links: data.links });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handlePagination = (e) => {
    console.log(this.state.links);
    const suffix = this.state.links[e.target.name];
    this.getRestOfArticles(`${this.url}${suffix}`);
  };
  componentDidMount = () => {
    this.getArticles();
    this.getRestOfArticles();
  };
  render() {
    return (
      <div>
        <Container>
          {this.state.loading ? (
            <h1
              className="row align-items-center justify-content-center"
              style={{ height: "80vh" }}
            >
              <Spinner animation="border" className="mr-2" />
              Loading...
            </h1>
          ) : (
            <>
              <Row
                className={"row-cols-lg-3 pb-4"}
                style={{ borderBottom: "1px solid rgba(230, 230, 230, 1)" }}
              >
                <Col>
                  <ArticleListItem
                    article={this.state.articles[0]}
                    articleImg={"top"}
                    headingFont={"large"}
                    subheading
                  />
                </Col>

                <Col className={"flex-column w-100"}>
                  {this.state.articles.slice(1, 5).map((article) => (
                    <ArticleListItem
                      articleImg={"left"}
                      headingFont={"small"}
                      article={article}
                      key={uniqid()}
                    />
                  ))}
                </Col>

                <Col>
                  <PeopleList />
                  <TopicsToFollow />
                </Col>
                <Col className={""}>{/*<TagsList />*/}</Col>
              </Row>
              <Row className={"py-4 mt-4"}>
                <Col className={"col-lg-8 pr-5 pl-2"}>
                  {this.state.restOfArticles.map((article) => (
                    <ArticleListItem
                      articleImg={"left"}
                      headingFont={"large"}
                      subheading
                      article={article}
                      key={uniqid()}
                    />
                  ))}
                  {Object.keys(this.state.links) !== 0 && (
                    <Row className="d-flex justify-content-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        name="prev"
                        onClick={(e) => this.handlePagination(e)}
                      >
                        Prev
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        name="next"
                        onClick={(e) => this.handlePagination(e)}
                      >
                        Next
                      </Button>
                    </Row>
                  )}
                </Col>
                <Col className={"col-lg-4 "}>
                  <div
                    className={"flex-column py-4 px-4 w-100"}
                    style={{ backgroundColor: "rgb(250, 250, 250)" }}
                  >
                    <div className={"mb-4 title"}>
                      <IoBookmarksOutline style={{ fontSize: 20 }} />
                      <span className={"ml-2"}>READING LIST </span>
                    </div>
                    {this.state.articles.slice(0, 3).map((article) => (
                      <ArticleListItem
                        headingFont={"small"}
                        article={article}
                        key={uniqid()}
                      />
                    ))}
                  </div>
                  <Footer />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    );
  }
}
