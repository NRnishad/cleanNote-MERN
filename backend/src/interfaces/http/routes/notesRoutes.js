import express from 'express';

// Factory function to create the router with the injected controller
export const createNotesRouter = (notesController) => {
  const router = express.Router();

  router.get('/', notesController.getAllNotes);
  router.get('/:id', notesController.getNoteById);
  router.post('/', notesController.createNote);
  router.put('/:id', notesController.updateNote);
  router.delete('/:id', notesController.deleteNote);

  return router;
};