// Defines the contract for what any data source must be able to do.
// This is an abstract class, it doesn't do anything itself.
export class NoteRepository {
  async getAll() {
    throw new Error("NoteRepository.getAll() must be implemented");
  }

  async getById(id) {
    throw new Error("NoteRepository.getById(id) must be implemented");
  }

  async create(noteData) {
    throw new Error("NoteRepository.create(noteData) must be implemented");
  }

  async update(id, noteData) {
    throw new Error("NoteRepository.update(id, noteData) must be implemented");
  }

  async delete(id) {
    throw new Error("NoteRepository.delete(id) must be implemented");
  }
}