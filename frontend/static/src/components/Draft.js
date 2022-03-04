// import { useState } from "react";
// import Cookies from "js-cookie";
// import { Card } from "react-bootstrap";
// import Button from "@restart/ui/esm/Button";

// function Draft({
//   image,
//   body,
//   id,
//   preview,
//   handleImage,
//   handleError,
//   addImage,
//   setPreview,
//   setAddImage,
//   articles,
//   setArticles,
//   getArticles,
// }) {
//   const [edit, setEdit] = useState(false);
//   const [authorView, setAuthorView] = useState(null);
//   const [summary, setSummary] = useState("");
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");
//   const [phase, setPhase] = useState("");

//   const change = (e) => {
//     e.preventDefault();
//     editArticle(id);
//     setEdit(false);
//   };

//   const handleTitleInput = (e) => {
//     const addTitle = e.target.value;
//     setTitle(addTitle);
//   };

//   const handleTextInput = (e) => {
//     const addText = e.target.value;
//     setText(addText);
//   };

//   const handleSummaryInput = (e) => {
//     const addSummary = e.target.value;
//     setSummary(addSummary);
//   };

//   const deleteArticle = async (id) => {
//     const options = {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json",
//         "X-CSRFToken": Cookies.get("csrftoken"),
//       },
//     };

//     const response = await fetch(`/api/v1/articles/user/`, options).catch(
//       handleError
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not OK");
//     }

//     const viewAfterDelete = authorView.filter((article) => {
//       return article.id !== id;
//     });
//     setAuthorView(viewAfterDelete);
//   };

//   const editArticle = async (title, body, image, summary, id) => {
//     const updatedArticle = [...articles];
//     const index = updatedArticle.findIndex(
//       (articles) => articles.id === id
//     );
//     updatedArticle[index].title = title;
//     updatedArticle[index].body = body;
//     updatedArticle[index].summary = summary;

//     setArticles(updatedArticle);

//     const formData = new FormData();
//     for (const [key, value] of Object.entries(updatedArticle)) {
//       if (value) {
//         formData.append(key, value);
//       }
//     }

//     const options = {
//       method: "PATCH",
//       headers: {
//         "X-CSRFToken": Cookies.get("csrftoken"),
//       },
//       body: formData,
//     };

//     const response = await fetch(`/api/v1/articles/user/`, options).catch(
//       handleError
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not OK");
//     }

//     const data = await response.json();

//     const updateEditView = authorView.map((article) => {
//       if (article.id == id) {
//         return data;
//       } else {
//         return article;
//       }
//     });
//     setAuthorView(updateEditView);
//     setTitle("");
//     setText("");
//     setSummary("");
//     setPreview("");
//     setAddImage("");
//     setPhase("");
//   };

//   const displayMode = (
//     <article className="article" key={id}>
//       <Card style={{ width: "18rem" }}>
//         <Card.Img variant="top" src={image} />
//         <Card.Body>
//           <h2>{title}</h2>
//           <h6>{body}</h6>
//           <Button value={title} onClick={getArticles}>Read more...</Button>
//         </Card.Body>
//         <button className="editButton" onClick={() => setEdit(true)}>
//           Edit
//         </button>
//         <button className="editButton" onClick={() => deleteArticle(id)}>
//           Delete
//         </button>
//       </Card>
//     </article>
//   );

//   const editMode = (
//     <>
//       <form onSubmit={change}>
//         <div>
//           <input
//             className="inputField"
//             type="text"
//             placeholder="title"
//             onChange={handleTitleInput}
//           ></input>
//         </div>
//         <div>
//           <input
//             className="inputField"
//             type="text"
//             placeholder="summary"
//             onChange={handleSummaryInput}
//           ></input>
//         </div>
//         <div>
//           <input
//             className="inputField"
//             type="text"
//             placeholder="text"
//             onChange={handleTextInput}
//           ></input>
//         </div>
//         <div>
//           <input type="file" onChange={handleImage} />
//           {preview && <img src={preview} alt="" />}
//         </div>
//         <button type="submit" onClick={() => setPhase("DRAFT")}>
//           Save
//         </button>
//         <button type="submit" onClick={() => setPhase("SUBMIT")}>
//           Save/Submit
//         </button>
//       </form>
//       <button
//         className="loginRegisterBtn create"
//         onClick={() => setEdit(false)}
//       >
//         Back
//       </button>
//     </>
//   );

//   return <div>{edit ? editMode : displayMode}</div>;
// }
// export default Draft;
