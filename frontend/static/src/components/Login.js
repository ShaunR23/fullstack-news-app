import Cookies from "js-cookie";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useOutletContext, Link } from "react-router-dom";
import { handleError } from "./../utils.js";

const INITIAL_STATE = {
  username: "",
  password: "",
};

function Login(props) {
  const { navigate, setAuth, setAdmin } = useOutletContext();

  const [state, setState] = useState(INITIAL_STATE);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSFRToken": Cookies.get("csfrtoken"),
      },
      body: JSON.stringify(state),
    };

    const response = await fetch("/rest-auth/login/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response no ok!");
    }

    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    setAuth(true);
    setAdmin(data.is_superuser);
    setState(INITIAL_STATE);
    navigate("/", { replace: true });
  };

  return (
    <div className="login-form-container d-flex justify-content-center">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          className=""
          id="username"
          name="username"
          type="text"
          required
          onChange={handleInput}
          value={state.username}
        />

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          className=""
          id="password"
          name="password"
          type="password"
          required
          onChange={handleInput}
          value={state.password}
        />
        <Link to="/register">Need an account? Register today!</Link><br></br>
        
        <Button variant="light" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
