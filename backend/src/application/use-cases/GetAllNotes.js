export class GetAllNotes {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(userId) {
    return await this.noteRepository.findAllByUserId(userId);
  }
}