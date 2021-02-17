import React, { Component } from "react";
import ReactQuill from "react-quill";
import uiavatars from "ui-avatars";
import { giveMeAnAvatar } from "give-me-an-avatar";
import { Container } from "react-bootstrap";
import "react-quill/dist/quill.bubble.css";
import { Button, Alert } from "react-bootstrap";
import "./styles.scss";
import CategoryPicker from "../../components/CategoryPicker";

export default class NewStory extends Component {
  state = {
    headLine: "",
    content: "",
    cover: "",
    category: {},
    err: false,
    errMsg: "",
  };
  editor = React.createRef();
  handleContent = (content) => {
    this.setState({ content });
  };
  handleTopic = (topic) => {
    this.setState({ category: topic });
  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.editor && this.editor.current.focus();
      console.log(this.editor);
    }
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  postArticle = async () => {
    const url = process.env.REACT_APP_API_URL;
    const avatarURL = await giveMeAnAvatar({ Name: "John Doe", Size: "48" });
    const payload = {
      ...this.state,
      author: {
        name: "John Doe",
        img: avatarURL,
      },
      subHead: "",
    };
    // console.log("payload: ", payload);
    try {
      if (Object.keys(payload.category === 0)) {
        this.setState({ err: true, errMsg: "Please select a category" });
        throw new Error("Category is empty");
      }
      let res = await fetch(`${url}/articles`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: process.env.REACT_APP_ORIGIN,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        this.setState({ err: false, errMSg: "" });
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { headLine, content, cover, err, errMsg } = this.state;
    return (
      <Container className="new-story-container" expand="md">
        {err && (
          <Alert
            dismissible
            variant="warning"
            onClose={() => this.setState({ err: false, errMsg: "" })}
          >
            {errMsg}
          </Alert>
        )}
        <div className="category-container">
          <CategoryPicker
            onChange={(topic) => {
              // console.log(topic);
              this.handleTopic(topic);
            }}
          />
        </div>
        <input
          type="text"
          name="headLine"
          value={headLine}
          onKeyDown={this.onKeyDown}
          placeholder="Title"
          className="article-title-input"
          onChange={(e) => this.handleInput(e)}
        />
        {/* <input
          type="text"
          name="subHead"
          value={subHead}
          onKeyDown={this.onKeyDown}
          placeholder="Subtitle"
          className="article-subtitle-input"
          onChange={(e) => this.handleInput(e)}
        /> */}
        <ReactQuill
          modules={NewStory.modules}
          formats={NewStory.formats}
          ref={this.editor}
          theme="bubble"
          name="content"
          value={content}
          onChange={this.handleContent}
          placeholder="Tell your story..."
        />
        <input
          type="text"
          name="cover"
          value={cover}
          onKeyDown={this.onKeyDown}
          onChange={(e) => this.handleInput(e)}
          placeholder="Cover link e.g : https://picsum.photos/800"
          className="article-cover-input"
        />
        <Button
          variant="success"
          className="post-btn"
          onClick={() => this.postArticle()}
        >
          Post
        </Button>
      </Container>
    );
  }
}

NewStory.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],

    ["bold", "italic", "blockquote"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],

    ["link", "image"],

    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
NewStory.formats = [
  "header",
  "bold",
  "italic",
  "blockquote",
  "align",

  "link",
  "image",
];
