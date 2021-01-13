import React from "react";
import "./styles.scss";
class ArticleItemDetails extends React.Component {
  render() {
    const { article, headingFont, subheading } = this.props;
    const articleLink = `/read/${article._id}`;
    return (
      <div className={"pr-3"}>
        <div className={"d-flex align-center mb-2"}>
          <img
            alt="cover"
            style={{ width: "20px", height: "20px" }}
            src={
              "https://miro.medium.com/fit/c/20/20/1*xF11-TSkpJSCgLc75f-DFw.jpeg"
            }
          />

          <span className={"author"}>
            <a href={"/"}>
              <b>{article.author.name} </b> in <b>Better Advice</b>
            </a>
          </span>
        </div>
        <a href={articleLink}>
          <span
            className={"heading"}
            style={{
              fontSize: headingFont === "small" ? "16px" : "22px",
              lineHeight: headingFont === "small" ? "20px" : "28px",
            }}
          >
            {article.headLine}
          </span>
        </a>

        {subheading && (
          <div className={"subheading"}>
            <p>
              <a href={articleLink}>{article.subHead}</a>
            </p>
          </div>
        )}
        <div className={"d-flex align-baseline justify-between mt-2"}>
          <h4 className={"date"}>
            <div className={"d-flex"}>
              <span>{new Date(article.updatedAt).toDateString()}</span>
              <div>
                <span>
                  <span>·</span>
                </span>
              </div>

              <span>
                <span>{Math.floor(article.content.length / 600)} min read</span>
              </span>
            </div>
          </h4>
        </div>
      </div>
    );
  }
}

export default ArticleItemDetails;
