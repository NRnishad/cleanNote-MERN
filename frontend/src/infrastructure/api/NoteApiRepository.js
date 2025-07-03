import { NoteRepository } from '../../domain/repositories/NoteRepository.js';
import { Note } from '../../domain/models/Note.js';
import api from '../../lib/axios.js';

// Helper to map raw API data to a domain Note object
const toDomain = (noteData) => new Note({
    id: noteData.id,
    title: noteData.title,
    content: noteData.content,
    createdAt: noteData.createdAt,
});

export class NoteApiRepository extends NoteRepository {
  async getAll() {
    const response = await api.get('/notes');
    return response.data.map(toDomain);
  }

  async getById(id) {
    const response = await api.get(`/notes/${id}`);
    return toDomain(response.data);
  }

  async create(noteData) {
    const response = await api.post('/notes', noteData);
    return toDomain(response.data);
  }

  async update(id, noteData) {
    const response = await api.put(`/notes/${id}`, noteData);
    return toDomain(response.data);
  }

  async delete(id) {
    await api.delete(`/notes/${id}`);
    // Delete doesn't return the note, so we return nothing.
  }
}