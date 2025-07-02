export class GetNoteById {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(id) {
    return await this.noteRepository.findById(id);
  }
}