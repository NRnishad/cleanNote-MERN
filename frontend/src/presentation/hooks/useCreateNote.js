import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { NoteApiRepository } from '../../infrastructure/api/NoteApiRepository.js';
import { CreateNote } from '../../application/CreateNote.js';

const noteRepository = new NoteApiRepository();
const createNoteUseCase = new CreateNote(noteRepository);

export function useCreateNote() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createNote = async ({ title, content }) => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      await createNoteUseCase.execute({ title, content });
      toast.success('Note created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating note:', error);
      if (error.response?.status === 429) {
        toast.error('You are being rate limited.');
      } else {
        toast.error('Failed to create note.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, createNote };
}