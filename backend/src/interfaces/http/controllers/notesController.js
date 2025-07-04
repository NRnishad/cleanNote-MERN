export class NotesController {
  constructor(createNote, getAllNotes, getNoteById, updateNote, deleteNote) {
    this.createNoteUseCase = createNote;
    this.getAllNotesUseCase = getAllNotes;
    this.getNoteByIdUseCase = getNoteById;
    this.updateNoteUseCase = updateNote;
    this.deleteNoteUseCase = deleteNote;
  }

  getAllNotes = async (req, res) => {
    try {
      const notes = await this.getAllNotesUseCase.execute(req.user.id);
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getNoteById = async (req, res) => {
    try {
      const { id } = req.params;
      const note = await this.getNoteByIdUseCase.execute(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(200).json(note);
    } catch (error) {
      console.error('Error getting note by id in controller', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  createNote = async (req, res) => {
    try {
      const { title, content } = req.body;
      const savedNote = await this.createNoteUseCase.execute(req.body, req.user.id);
      res.status(201).json(savedNote);
    } catch (error) {
      console.error('Error creating note in controller', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  updateNote = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
       const note = await this.getNoteByIdUseCase.execute(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      const updatedNote = await this.updateNoteUseCase.execute(id, { title, content });
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error in update note controller', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      const note = await this.getNoteByIdUseCase.execute(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      // const deletedNote = await this.deleteNoteUseCase.execute(id);
      // if (!deletedNote) {
      //   return res.status(404).json({ message: 'Note not found' });
      // }
      // res.status(200).json({ message: 'Note deleted successfully' });
      await this.deleteNoteUseCase.execute(id);
      res.status(200).json({ message: 'Note deleted successfully' });


    } catch (error) {
      console.error('Error in delete note controller', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}