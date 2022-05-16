const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// [[[[ ROUTE 1 ]]]]

// [[[[ ROUTE 1 ]]]] GET all the notes using: GET '/api/notes/getuser '. LOGIN REQUIRED
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message); 
    res.status(500).send('Internal server occured');
  }
    
});

// [[[[ ROUTE 2 ]]]]

// [[[[ ROUTE 2 ]]]] Add a note using: POST '/api/notes/addnote '. LOGIN REQUIRED
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
      try {
        const { title, description, tag } = req.body; //destructre the body

        //if there are any error than return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        // promise
        const note = new Note({
          title,
          description,
          tag,
          user: req.user.id,
        });
        const savedNote = await note.save()
    
        res.json(savedNote);
      } catch (error) {
        console.error(error.message); 
        res.status(500).send('Internal server occured');
      }
   
  }
)

// [[[[ ROUTE 3 ]]]]

// [[[[ ROUTE 3 ]]]] update a note using: PUT '/api/notes/updatenote '. LOGIN REQUIRED
router.put("/updatenote/:id", fetchuser,  async (req, res) => {
    const {title,description,tag} = req.body;
    try {
         //create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it
    let note  = await  Note.findById(req.params.id);
    if(!note){
        return res.status(404).send( 'Not Found')
    }
    //check if the user is same or not same
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed');
    } 

    //and only update the note 
     note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
    } catch (error) {
        console.error(error.message); 
        res.status(500).send('Internal server occured'); 
    }
   

    })


    // [[[[ ROUTE 4 ]]]]

// [[[[ ROUTE 4 ]]]] delete a note using: DELETE '/api/notes/deletenote '. LOGIN REQUIRED
router.delete ("/deletenote/:id", fetchuser,  async (req, res) => {
    try {
        //find the note to be deleted and delete it
        let note  = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send( 'Not Found')
        }
        //check if the user is same or not same or allow deletion only if the user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        } 
    
        //and only update the note 
         note = await Note.findByIdAndDelete(req.params.id)
        res.json({'success': 'note has been deleted',note: note});
    } catch (error) {
        console.error(error.message); 
        res.status(500).send('Internal server occured'); 
    }
    
  

    })

module.exports = router;
