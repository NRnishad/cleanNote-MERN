export class DeleteNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(id) {
    return this.noteRepository.delete(id);
  }
}