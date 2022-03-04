import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { handleError } from "../utils";

const INITIAL_STATE = {
  title: "",
  summary: "",
  body: "",
  image: "",
  category: "",
  phase: "",
};



function ArticleForm(props) {
  const navigate = useOutletContext();
  const [phase, setPhase] = useState("");

  const [state, setState] = useState({ ...props });
  const [preview, setPreview] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("body", state.body);
    formData.append("image", state.file);
    formData.append("summary", state.summary);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    await fetch(`/api/v1/user/articles/`, options);
    setState({ ...state, ...INITIAL_STATE });
    setPreview("");
  };

  const handleUpdate = async (e) => {
    const pk = state.id
    // this is where you write your put request (updating a preexiting article)
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("body", state.body);
    formData.append("image", state.file);
    formData.append("summary", state.summary);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

     await fetch(`/api/v1/user/articles/${pk}/`, options).catch(
      handleError
    );

  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setState({ ...state, file: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="article-form-title d-flex justify-content-center">
        <h2>Submit your Article</h2>
      </div>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="col-6 article-form">
          <Form onSubmit={state.id ? handleUpdate : handleSubmit}>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              id="title"
              name="title"
              type="text"
              onChange={handleInput}
              value={state.title}
            />
            <Form.Label htmlFor="body">Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="body"
              name="body"
              onChange={handleInput}
              value={state.body}
            />
             <Form.Label htmlFor="summary">Summary</Form.Label>
            <Form.Control
              rows={3}
              id="summary"
              type="text"
              name="summary"
              onChange={handleInput}
              value={state.summary}
            />
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control
              id="image"
              name="image"
              type="file"
              onChange={handleImage}
            />
            {/* <Button type="submit" className="delete-draft">
              Submit Article
            </Button> */}
            <Button type="submit" onClick={() => setPhase("DRAFT")}>
              Save
            </Button>
            <Button type="submit" onClick={() => setPhase("SUBMIT")}>
              Submit
            </Button>
            {/* <Button className="editButton" onClick={() => setEdit(true)}>
//           Edit
//         </Button> */}
          </Form>
        </div>
      </div>
    </>
  );
}

ArticleForm.defaultProps = INITIAL_STATE;

export default ArticleForm;
