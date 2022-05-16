import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext' 


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context; 
    const { note, updateNote } = props;
   
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h4 className="card-title">{note.title}</h4>
                            <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note )}}></i>
                            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert('Note have been Deleted', 'danger');}}></i>
                        </div> 
                       
                        <p className="card-text"> {note.description}</p>
                        <p className="card-text" style={{textAlign:'right', fontStyle: 'italic'}}> {note.tag}</p>
                        
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
