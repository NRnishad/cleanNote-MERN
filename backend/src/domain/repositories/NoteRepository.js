export class NoteRepository {
  async add(note) {
    throw new Error("Method 'add()' must be implemented.");
  }

  async findById(id) {
    throw new Error("Method 'findById()' must be implemented.");
  }

  async findAll() {
    throw new Error("Method 'findAll()' must be implemented.");
  }

  async update(id, { title, content }) {
    throw new Error("Method 'update()' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}