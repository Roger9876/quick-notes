import axios from 'axios';
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';

const NoteList = ({ notes, editNote, onNoteListUpdated }) => {
  const URL = import.meta.env.VITE_API_URL;

  const deleteNote = async (note) => {
    const confirm = window.confirm('Are you sure you want to delete this note?');

    if (!confirm) return;

    await axios.delete(`${URL}${note.id}/`)
      .then(() => {
        onNoteListUpdated(notes.filter(n => n.id !== note.id));
        toast.success('Note deleted successfully', { autoClose: 1500 });
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        {notes.sort((a, b) => b.id - a.id).map((note) => (
          <div key={note.id} onClick={() => editNote(note)}>
            <div className="card bg-base-100 h-48 w-auto shadow-xl m-4 cursor-pointer">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{note.title}</h2>
                  <FaTrash className="text-red-500" onClick={(e) => { e.stopPropagation(); deleteNote(note); }} />
                </div>
                {note.content.length > 50
                  ? <p>{note.content.substring(0, 50)}...</p>
                  : <p>{note.content}</p>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default NoteList
