export class DeleteNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(id) {
    return await this.noteRepository.delete(id);
  }
}