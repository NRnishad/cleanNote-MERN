import React from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import NotesNotFoundUI from '../components/NotesNotFoundUI';
import { useNotes } from '../hooks/useNotes';

function HomePage() {
  // Get the deleteNote function from the hook, remove setNotes
  const { notes, loading, isRateLimited, deleteNote } = useNotes();

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFoundUI />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              // Pass the deleteNote function down to the card
              <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;