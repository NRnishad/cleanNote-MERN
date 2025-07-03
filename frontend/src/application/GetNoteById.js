export class GetNoteById {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(id) {
    return this.noteRepository.getById(id);
  }
}