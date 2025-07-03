import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { NoteApiRepository } from '../../infrastructure/api/NoteApiRepository.js';
import { GetAllNotes } from '../../application/GetAllNotes.js';
import { DeleteNote } from '../../application/DeleteNote.js';

const noteRepository = new NoteApiRepository();
const getAllNotesUseCase = new GetAllNotes(noteRepository);
const deleteNoteUseCase = new DeleteNote(noteRepository);

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setIsRateLimited(false);
    try {
      const notesData = await getAllNotesUseCase.execute();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error('Failed to fetch notes. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const deleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNoteUseCase.execute(id);
      // Update the state locally for an instant UI update
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      if (error.response?.status === 429) {
        toast.error('You are being rate limited.');
      } else {
        toast.error('Failed to delete note.');
      }
    }
  };

  // The hook now returns the delete function instead of the state setter
  return { notes, loading, isRateLimited, deleteNote };
}