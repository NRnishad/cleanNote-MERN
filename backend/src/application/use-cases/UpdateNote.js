export class UpdateNote {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(id, { title, content }) {
    return await this.noteRepository.update(id, { title, content });
  }
}