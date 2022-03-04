import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ArticleForm from "./ArticleForm";
import { useOutletContext } from "react-router-dom";
import { Container, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { handleError } from "./../utils.js";

function ArticleList(props, {editMode}) {
  const [articles, setArticles] = useState(props.articles);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch("/api/v1/articles/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      } else {
        const data = await response.json();
        setArticles(data);
      }
    };
    getArticles();
  }, []);

  const articlesHTML = articles.map((article) => (
    <article className="article-cards text-center col col-md-3" key={article.id}>
      <Card>
        <h2>{article.title}</h2>
        <Card.Img variant="top" src={article.image} />
        <Card.Body>
          <p>{article.summary}</p>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>{article.body}</Modal.Body>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal>
          <Button className="articleBtn" variant="primary" onClick={handleShow}>
            Read Article
          </Button>
        </Card.Body>
      </Card>
    </article>
  ));

  return (
    <>
      <div className="container content-row">
        <div className="row">{articlesHTML};</div>
      </div>
    </>
  );
}

ArticleList.defaultProps = {
  articles: [],
};

export default ArticleList;
