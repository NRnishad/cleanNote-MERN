export class GetAllNotes {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute() {
    return await this.noteRepository.findAll();
  }
}