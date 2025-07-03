export class CreateNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(noteData) {
    // You could add validation logic here before creating
    return this.noteRepository.create(noteData);
  }
}