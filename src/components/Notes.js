import React,{useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext' 
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Notes = (props) => {
  const context = useContext(noteContext) 
  let history =useHistory();
    const {notes,getNotes, editNote } = context;
     
    useEffect(()=>{
      if(localStorage.getItem('token')){
      getNotes()
      }
      else{
        history.push('/login')
      }
      // eslint-disable-next-line
    },[] )
    const ref = useRef(null)
    const refClose = useRef(null)
    const[note, setNote]= useState({id:'', etitle:'', edescription:'',etag:''})

    const updateNote = (currentNote)=>{
      ref.current.click()
      setNote({id: currentNote._id,  etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
   
    }
   

    const handleClick = (e)=>{
      console.log('updating note' , note );
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click(); 
      props.showAlert('Note have been updated', 'success');
      
  }
  const onChange=(e)=>{
       setNote({...note,[e.target.name]:  e.target.value})
  }
  return (
    <>

<AddNote showAlert={props.showAlert}/> 

{/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary d-none" ref={ref}  data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
{/* Modal  */}
<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Note Title</label>
        <input type="text " className="form-control" id="etitle" name='etitle' minLength={5} value={note.etitle}  onChange={onChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="edescription" value={note.edescription} minLength={5} name="edescription" onChange={onChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
      </div> 
    </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose } className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary"onClick={handleClick}>Update Note </button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
    <h2>Your Notes</h2>
    <div className="container mx-3">
    {notes.length===0 && 'No notes to display'}
    </div>
      
    {notes.map((note)=>{
      return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
    })}
    </div>
    </> 
   
  )
}

export default Notes
