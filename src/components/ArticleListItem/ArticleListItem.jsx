import React from "react";
import ArticleItemDetails from "../ArticleItemDetails/ArticleItemDetails";
import "./styles.scss";
class ArticleListItem extends React.Component {
  render() {
    const { articleImg, article } = this.props;
    return (
      <div
        className={`w-100 d-flex mb-auto justify-content-between align-start  pb-4 ${
          articleImg === "top" && "flex-column-reverse"
        }`}
      >
        <ArticleItemDetails {...this.props} />
        {articleImg && (
          <a href={`/read/${article._id}`}>
            <img
              alt="cover"
              className={articleImg === "top" ? "img-large" : "img-small"}
              src={article.cover}
            />
          </a>
        )}
      </div>
    );
  }
}

export default ArticleListItem;
