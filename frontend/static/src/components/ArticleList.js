import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ArticleForm from "./ArticleForm";
import { useOutletContext } from "react-router-dom";
import { Container } from "react-bootstrap";

function ArticleList({handleError}) {
    const [articleList, setArticleList] = useState([]);
    const navigate = useOutletContext();


    useEffect(() => {
        const getArticles = async () =>{
          const response = await fetch('/api/v1/articles/').catch(handleError);
          if(!response.ok){
            throw new Error('Network response was not OK!')  }else{
              const data = await response.json();
              setArticleList(data);
            }
          }
          getArticles();
    }, []);

    
  
  const articleHTML = articleList.map((article) => (
    <article class='article' key={article.id}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={article.image} />
        <Card.Body>
          <h2>{article.title}</h2>
          <h6>{article.body}</h6>
        </Card.Body>
      </Card>
   
    </article>
    
    
    
  ));
  return( 
  <div class='article-display'>
 
  {articleHTML};
  </div>
  )}

export default ArticleList;
