import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { NoteApiRepository } from '../../infrastructure/api/NoteApiRepository.js';
import { GetNoteById } from '../../application/GetNoteById.js';
import { UpdateNote } from '../../application/UpdateNote.js';
import { DeleteNote } from '../../application/DeleteNote.js';

// Instantiate dependencies once, outside the component
const noteRepository = new NoteApiRepository();
const getNoteByIdUseCase = new GetNoteById(noteRepository);
const updateNoteUseCase = new UpdateNote(noteRepository);
const deleteNoteUseCase = new DeleteNote(noteRepository);

export function useNoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const noteData = await getNoteByIdUseCase.execute(id);
        setNote(noteData);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Could not find the note.');
        navigate('/'); // Navigate home if note not found
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!note || !note.title.trim() || !note.content.trim()) {
      toast.error('Title and content cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      await updateNoteUseCase.execute(id, { title: note.title, content: note.content });
      toast.success('Note updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
      if (error.response?.status === 429) {
        toast.error('You are being rate limited.');
      } else {
        toast.error('Failed to update note.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await deleteNoteUseCase.execute(id);
      toast.success('Note deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      if (error.response?.status === 429) {
        toast.error('You are being rate limited.');
      } else {
        toast.error('Failed to delete note.');
      }
    }
  };

  return { note, setNote, loading, saving, handleSave, handleDelete };
}