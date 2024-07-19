import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddEditNote = ({ note, onNoteUpdated, getNotes }) => {

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const URL = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (note?.id) {
      setTitle(note?.title);
      setContent(note?.content);
      document.getElementById(`modal-${note?.id}`)?.showModal();
    } else {
      document.getElementById('modal-new')?.showModal();
    }
  }, [note]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setTitle('');
        setContent('');
        onNoteUpdated();
        document.getElementById(`modal-${note?.id || 'new'}`)?.close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [note, onNoteUpdated]);

  const onSubmit = async (data) => {
    const newNote = {
      title: data.title,
      content: data.content
    };

    if (note?.id) {
      axios.put(`${URL}${note.id}/`, newNote)
        .then(() => {
          document.getElementById(`modal-${note.id}`)?.close();
          toast.success('Note updated successfully', { autoClose: 1500 });
          getNotes();
          onNoteUpdated();
        })
        .catch(error => console.error('Error updating note:', error));
    } else {
      axios.post(URL, newNote)
        .then(() => {
          document.getElementById('modal-new')?.close();
          toast.success('Note added successfully', { autoClose: 1500 });
          getNotes();
          onNoteUpdated();
        })
        .catch(error => console.error('Error adding note:', error));
    }
  };

  return (
    <div>
      {/* Modal */}
      <dialog id={`modal-${note?.id || 'new'}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">{note?.id ? 'Edit Note' : 'Add Note'}</h3>
            <div className="divider"></div>
            {/* Title */}
            <div className="mt-4">
              <input
                className="w-80 px-3 py-1 border rounded-md outline-none"
                placeholder="Enter the title"
                type="text"
                defaultValue={title}
                {...register("title")} />
              <br />
            </div>
            {/* Content */}
            <div className="mt-4">
              <textarea
                className="w-80 h-40 px-3 py-1 border rounded-md outline-none"
                placeholder="Enter the content"
                defaultValue={content}
                {...register("content", { required: true })} />
              <br />
              {errors.content && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button className="bg-blue-300 text-white rounded-lg px-3 py-2 hover:bg-blue-500 focus:bg-blue-500 outline-none duration-200">Save</button>
              <button type="button" className="btn"
                onClick={() => {
                  setTitle('');
                  setContent('');
                  onNoteUpdated();
                  document.getElementById(`modal-${note?.id || 'new'}`)?.close();
                }}
              >Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default AddEditNote
