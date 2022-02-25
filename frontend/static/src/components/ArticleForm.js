import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function ArticleForm(){
    const navigate = useOutletContext();
    const INITIAL_STATE = {
        title: '',
        body: '',
        image:'',
        
    }

    const [state, setState] = useState(INITIAL_STATE)
    const [preview, setPreview] = useState('');
    
    const handleInput = (e) => {
        const { name, value } = e.target
        
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', state.title)
        formData.append('body', state.body)
        formData.append('image', state.file);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        fetch('/api/v1/articles/', options);
        setState(INITIAL_STATE);
        setPreview('');
        
    }

    const handleImage = e => {
        const file = e.target.files[0];
        setState({ ...state, 'file': file })
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);

    }

    return(
        <>
        <div>
        <h2>Submit your Article</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
                id='title'
                name='title'
                type='text'
                onChange={handleInput}
                value={state.title}
                
            />
            <Form.Label htmlFor="body">Body</Form.Label>
            <Form.Control
                id='body'
                name='body'
                type='textarea'
                onChange={handleInput}
                value={state.body} 
            />
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control
                id='image'
                name='image'
                type='file'
                onChange={handleImage}/>
            <Button type='submit' className='delete-draft'>Submit Article</Button>
            </Form>
        </div>
        </>
    )
}

export default ArticleForm