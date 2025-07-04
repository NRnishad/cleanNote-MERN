import { NoteRepository } from '../../domain/repositories/NoteRepository.js';
import { Note } from '../../domain/Note.js';
import NoteModel from './models/NoteSchema.js';

export class MongoNoteRepository extends NoteRepository {
  // Mapper to convert a Mongoose document to a domain Note object
  _toDomain(mongoNote) {
    if (!mongoNote) return null;
    return new Note({
      id: mongoNote._id.toString(),
      title: mongoNote.title,
      content: mongoNote.content,
      createdAt: mongoNote.createdAt,
      updatedAt: mongoNote.updatedAt,
      user: mongoNote.user, 
    });
  }

  async add(note, userId) {
    const newNote = new NoteModel({
      title: note.title,
      content: note.content,
      user: userId,
    });
    const savedNote = await newNote.save();
    return this._toDomain(savedNote);
  }

  async findById(id) {
    const note = await NoteModel.findById(id);
    return this._toDomain(note);
  }

  async findAllByUserId(userId) {
    const notes = await NoteModel.find({ user: userId }).sort({ createdAt: -1 });
    return notes.map(this._toDomain);
  }

  async update(id, { title, content }) {
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    return this._toDomain(updatedNote);
  }

  async delete(id) {
    
    const deletedNote = await NoteModel.findByIdAndDelete(id);
    return this._toDomain(deletedNote);
  }
}