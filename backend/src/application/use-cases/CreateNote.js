import { Note } from '../../domain/Note.js';

export class CreateNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ title, content }) {
    // Business logic could be added here, e.g., validation
    const newNote = new Note(null, title, content); // ID is null initially
    return await this.noteRepository.add(newNote);
  }
}