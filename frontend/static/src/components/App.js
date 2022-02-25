import Login from './Login'
import Register from './Register'
import Header from './Header'
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';
import { useNavigate, Outlet } from "react-router-dom";

import { useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  
  return (
    <>
    <Header />
    <Outlet context={[navigate]}/>
    
    </>
  );
}

export default App;
