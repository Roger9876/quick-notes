import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import NoteList from './components/NoteList';
import AddEditNote from './components/AddEditNote';
import axios from "axios";

function App() {
  const URL = import.meta.env.VITE_API_URL;

  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  const handleNoteList = (notes) => {
    setNotes(notes);
  }

  const handleNoteUpdated = () => {
    setSelectedNote(null);
  };

  // Fetch notes from the API
  const getNotes = async () => {
    await axios.get(URL)
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  };

  // Get notes on page load
  useEffect(() => {
    getNotes();
  }, []);


  return (
    <div className='bg-slate-200 min-h-screen'>
      <h1 className='text-2xl p-5 mb-20 font-bold pl-10 fixed left-0 right-0 top-0 z-10 bg-blue-200 shadow-md'>Quick Notes</h1>
      <div className='pt-20'>
        {/* <NoteList /> */}
        <NoteList notes={notes} editNote={setSelectedNote} onNoteListUpdated={handleNoteList} />
      </div>
      <button
        className="btn btn-circle bg-yellow-400 fixed bottom-10 right-10 hover:bg-amber-400"
        onClick={() => setSelectedNote({})} >
        <FaPlus className="h-6 w-6 col" />
      </button>
      {selectedNote && (
        <AddEditNote
          note={selectedNote}
          onNoteUpdated={handleNoteUpdated}
          getNotes={getNotes}
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default App
