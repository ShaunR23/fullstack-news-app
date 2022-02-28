import {useState} from 'react'
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button'

function AdminUpdate({id, title, body, summary, image, handleError , setAdminView , adminView}){
    const [status, setStatus] = useState(false)
    const [newPhase, setNewPhase] = useState('')
    const [section, setSection] = useState(false)
    const [newCategory, setNewCategory] = useState('')

        const updateArticleStatus = async (e) => {

            const updatedArticle = {
                phase: e.target.value
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
        
            const response = await fetch(`/api/v1/articles/admin/`, options).catch(handleError);
        
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }
    
            const data = await response.json();

            const updateArticleStatus = adminView.map((article) => {
                if (article.id == id){
                    return data
                } else {
                    return article
                }
            })
        
            setAdminView(updateArticleStatus)
            setStatus(false)
            setNewPhase('')
          }

          const updateArticleCategory = async (e) => {

            const updatedCatagory = {
                catagory: e.target.value
            }
    
            const formData = new FormData();
            for(const [key, value] of Object.entries(updatedCatagory)) {
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
        
            const response = await fetch(`/api/v1/articles/${id}/admin/`, options).catch(handleError);
        
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }
    
            const data = await response.json();

            const updateArticleStatus = adminView.map((article) => {
                if (article.id == id){
                    return data
                } else {
                    return article
                }
            })
        
            setAdminView(updateArticleStatus)
            setSection(false)
            setNewCategory('')
          }


    const list = (
        <button className='articleButton' onClick={() => setStatus(true)}>Change status</button>
    )


    const statusView = (
        <div>
            <Button  value='REJECTED' onClick={updateArticleStatus}>Reject</Button>
            <Button  value='PUBLISHED' onClick={updateArticleStatus}>Publish</Button>
            <Button  value='ARCHIVED' onClick={updateArticleStatus}>Archive</Button> 
            <Button  onClick={() => setStatus(false)}>Back</Button> 
        </div>
    )

    const changeCategory = (
        <Button className='articleButton' onClick={() => setSection(true)}>Change Article Category</Button>
    )


    const selectCategory = (
        <div>
            <Button className='articleButton' value='SPORTS' onClick={updateArticleCategory}>Sport</Button>
            <Button className='articleButton' value='GAMING' onClick={updateArticleCategory}>Gaming</Button>
            <Button className='articleButton' value='ALL' onClick={updateArticleCategory}>All</Button> 
            <Button className='articleButton' onClick={() => setSection(false)}>Back</Button> 
        </div>
    )
        return(
        <div>
            {status ? statusView : list}
            {section ? selectCategory : changeCategory}
        </div>
        )
}

export default AdminUpdate