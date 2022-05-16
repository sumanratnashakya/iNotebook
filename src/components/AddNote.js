import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context; 
    const[note, setNote]= useState({title:'', description:'',tag:''})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:'', description:'',tag:''})// blank the field after filling data
        props.showAlert('Your note have been added', 'success')
    }
    const onChange=(e)=>{
         setNote({...note,[e.target.name]:  e.target.value})
    }
  return (
    <div className="container my-3">
    <h2>Add Your Notes</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Note Title</label>
        <input type="text " className="form-control" id="title" name='title' minLength={5} value={note.title} onChange={onChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description"  minLength={5} value={note.description} name="description" onChange={onChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={5} required/>
      </div>
      <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
    </div>
  )
}

export default AddNote
