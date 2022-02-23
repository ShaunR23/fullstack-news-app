import Login from './Login'
import Register from './Register'
import Header from './Header'
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';
import CreateArticle from './CreateArticle';
import { useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [selection,setSelection] = useState('register');
  return (
    <>
    <Header />
    {selection == 'register' ? <Register />: null}
    {selection == 'login' ? <Login />: null}
    {selection == 'articleList' ? <ArticleList />: null}
    {selection == 'createArticle' ? <CreateArticle />: null}
    {selection == 'articleForm' ? <ArticleForm />: null}
    </>
  );
}

export default App;
