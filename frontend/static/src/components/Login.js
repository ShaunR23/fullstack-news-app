import Cookies from 'js-cookie';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Login(props) {

    const [state, setState] = useState({
        username: '',
        password: '',
        email: '',
    })

    const handleInput = (event) => {
        const {name, value} = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }


    const handleError = (err) => {
        console.log(err);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSFRToken': Cookies.get('csfrtoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch('/rest-auth/login', options).catch(handleError)
        if(!response.ok) {
            throw new Error("Network response no ok!");
        }else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            PaymentResponse.setAuth(true);
        }
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                id='username'
                name='username'
                type='text'
                required
                onChange={handleInput}
                value={state.username}
            />
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
                id='email'
                name='email'
                type='email'
                required
                onChange={handleInput}
                value={state.email}
            />
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
                id='password'
                name='password'
                type='password'
                required
                onChange={handleInput}
                value={state.password}
            />
            <Button type="submit">Login</Button>
            </Form>
    )
}

export default Login