import { useState } from 'react'
import Cookies from 'js-cookie';


function Draft({image, body, id, preview, handleImage, handleError, authorView, setAuthorView, addImage, setPreview, setAddImage}) {
    const [edit, setEdit] = useState(false)
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [phase, setPhase] = useState('');

    const change = (e) => {
        e.preventDefault(); 
        editArticle(id)
        setEdit(false)
    }

    const handleTitleInput = e => {
        const addTitle = e.target.value;
        setTitle(addTitle)
    }

    const handleTextInput = e => {
        const addText = e.target.value;
        setText(addText)
    }

    const handleSummaryInput = e => {
        const addSummary = e.target.value;
        setSummary(addSummary)
    }
    
    const deleteArticle = async (id) => {
    
        const options = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
        }
    
        const response = await fetch(`/api/v1/articles/user/`, options).catch(handleError);
    
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        
        const viewAfterDelete = authorView.filter((article) => {
            return article.id !== id
        });
        setAuthorView(viewAfterDelete)
      }
    
      const editArticle = async (id) => {

        const updatedArticle = {
            title,
            text,
            summary,
            image: addImage,
            phase,
        }

        const formData = new FormData();
        for(const [key, value] of Object.entries(updatedArticle)) {
            if(value){
                formData.append(key, value)
            }
        }

        const options = {
          method: 'PATCH',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          body: formData
        }
    
        const response = await fetch(`/api/v1/articles/user/`, options).catch(handleError);
    
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }

        const data = await response.json();
    
        const updateEditView = authorView.map((article) => {
            if (article.id == id){
                return data
            } else {
                return article
            }
        })
        setAuthorView(updateEditView)
        setTitle('');
        setText('');
        setSummary('');
        setPreview('');
        setAddImage('')
        setPhase('');
  
      }

        const displayMode = (
            <article className='article'>
                <p className='title'>{title}</p>
                <div className='imgHolder'>
                    <img src={image} alt={title} />
                </div>
                <p className='summary'>{summary}</p>
                <p className='summary'>{body}</p>
                <button className='editDeleteButton' onClick={() => setEdit(true)}>Edit</button>
                <button className='editDeleteButton' onClick={() => deleteArticle(id)}>Delete</button>
            </article>
        )
    
        const editMode = (
            <>
            <article className='article'>
                    <h3 className='title'>{title}</h3>
                    <div className='imgHolder'>
                        <img src={image} alt={title} />
                     </div>
                     <p className='summary'>{summary}</p>
                     <p className='summary'>{body}</p>
                </article>

            )


            <form onSubmit={change}>

                <div>
                    <input className='inputField' type='text' placeholder='title' onChange={handleTitleInput} ></input>
                </div>
                <div>
                    <input className='inputField' type='text'  placeholder='summary' onChange={handleSummaryInput}></input>
                </div>
                <div>
                    <input className='inputField' type='text' placeholder='text' onChange={handleTextInput}></input>
                </div>
                <div>
                    <input type='file' onChange={handleImage} />
                    {preview && <img src={preview} alt='' />}
                </div>
                <button  type='submit' onClick={()=> setPhase('DRAFT')}>Save</button>
                <button  type='submit' onClick={()=> setPhase('SUBMIT')}>Save/Submit</button>
            </form>
            <button className='loginRegisterButton create' onClick={() => setEdit(false)}>Back</button>
            </>
        )

        
    
        return (
            <div>
                { edit ? editMode : displayMode }
            </div>
        )
    }
    export default Draft;