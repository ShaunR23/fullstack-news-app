import Cookies from 'js-cookie';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Login(props) {
    const [auth,setAuth] = useState('');
    const [state, setState] = useState({
        username: '',
        password: '',
       
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

        const response = await fetch('/rest-auth/login/', options).catch(handleError)
        if(!response.ok) {
            throw new Error("Network response no ok!");
        }else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            props.setAuth(true);
            setState({
                username: '',
                password: ''
            })
        }
    }

    const handleLogout = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch('/rest-auth/logout/', options).catch(
            handleError
        )

        const data = await response.json();
        Cookies.remove('Authorization', `Token ${data.key}`);
        props.setAuth(false);
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
            <Button type="submit" onClick={handleLogout}>Logout</Button>
            </Form>
    )
}

export default Login