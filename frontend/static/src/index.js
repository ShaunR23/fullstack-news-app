import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import Login from "./components/Login";
import ArticleList from "./components/ArticleList";
import UserArticleList from "./components/UserArticleList";
import Register from "./components/Register";
import ArticleForm from "./components/ArticleForm";
import reportWebVitals from "./reportWebVitals";
import AdminList from "./components/AdminList";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ArticleList />} />
          <Route path="user/articles/new" element={<ArticleForm />} />
          <Route path="user/articles" element={<UserArticleList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
