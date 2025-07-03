export class GetAllNotes {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute() {
    // Here you could add more business logic if needed
    return this.noteRepository.getAll();
  }
}