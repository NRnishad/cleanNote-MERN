export class UpdateNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(id, noteData) {
    return this.noteRepository.update(id, noteData);
  }
}