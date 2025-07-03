import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquareIcon, TrashIcon } from 'lucide-react';

const formatDate = (date) => new Date(date).toLocaleDateString("en-US", {
  year: 'numeric', month: 'short', day: 'numeric'
});

function NoteCard({ note, deleteNote }) {
  const handleDeleteClick = (e) => {
    e.preventDefault(); // Prevent navigating to the detail page
    deleteNote(note.id); // Call the function from the hook
  };

  return (
    <Link to={`/note/${note.id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between mt-4 items-center'>
          <span className='text-sm text-base-content/60'>{formatDate(note.createdAt)}</span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4'/>
            <button className='btn btn-ghost btn-xs text-error' onClick={handleDeleteClick}>
              <TrashIcon className='size-4'/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;