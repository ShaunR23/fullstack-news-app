import Cookies from 'js-cookie';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useOutletContext } from "react-router-dom";

function Login(props) {
    const [auth,setAuth] = useState('');
    const navigate = useOutletContext();
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
            setAuth(true);
            setState({
                username: '',
                password: ''
            })
        }
        navigate('')
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
        setAuth(false);
    }


    return(
        <div class='form-container'>
        <Form class='form' onSubmit={handleSubmit}>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                className='w-25'
                id='username'
                name='username'
                type='text'
                required
                onChange={handleInput}
                value={state.username}
            />
           
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
                className='w-25'
                id='password'
                name='password'
                type='password'
                required
                onChange={handleInput}
                value={state.password}
            />
            <Button size="sm" variant='light' type="submit">Login</Button>
            <Button size ="sm" variant='light' type="submit" onClick={handleLogout}>Logout</Button>
        </Form>
        </div>
    )
}

export default Login