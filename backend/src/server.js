// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { protect } from './interfaces/http/middleware/authMiddleware.js';

// --- Dependency Imports ---
// Infrastructure
import { connectDB } from './infrastructure/config/db.js';
import { MongoNoteRepository } from './infrastructure/database/MongoNoteRepository.js';
import rateLimiter from './interfaces/http/middleware/rateLimiter.js';

// authentication
import { RegisterUser } from './application/use-cases/RegisterUser.js';
import { LoginUser } from './application/use-cases/LoginUser.js';
import { MongoUserRepository } from './infrastructure/database/MongoUserRepository.js';
import { AuthController } from './interfaces/http/controllers/authController.js';
import { createAuthRouter } from './interfaces/http/routes/authRoutes.js';

// Application (Use Cases)
import { CreateNote } from './application/use-cases/CreateNote.js';
import { GetAllNotes } from './application/use-cases/GetAllNotes.js';
import { GetNoteById } from './application/use-cases/GetNoteById.js';
import { UpdateNote } from './application/use-cases/UpdateNote.js';
import { DeleteNote } from './application/use-cases/DeleteNote.js';

// Interfaces (Controllers & Routes)
import { NotesController } from './interfaces/http/controllers/notesController.js';
import { createNotesRouter } from './interfaces/http/routes/notesRoutes.js';

dotenv.config();

const app = express();
app.use(cookieParser());
const __dirname = path.resolve();

// --- Middleware ---
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
  });
}
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(rateLimiter); // Rate limiter is an HTTP-level concern

// --- Dependency Injection / Composition Root ---


// --- Auth Dependency Injection & Routes ---
const userRepository = new MongoUserRepository();
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository);
const authController = new AuthController(registerUserUseCase, loginUserUseCase);



// 1. Create repository instance (Infrastructure)
const noteRepository = new MongoNoteRepository();

// 2. Create use case instances, injecting the repository (Application)
const createNoteUseCase = new CreateNote(noteRepository);
const getAllNotesUseCase = new GetAllNotes(noteRepository);
const getNoteByIdUseCase = new GetNoteById(noteRepository);
const updateNoteUseCase = new UpdateNote(noteRepository);
const deleteNoteUseCase = new DeleteNote(noteRepository);

// 3. Create controller instance, injecting the use cases (Interfaces)
const notesController = new NotesController(
  createNoteUseCase,
  getAllNotesUseCase,
  getNoteByIdUseCase,
  updateNoteUseCase,
  deleteNoteUseCase
);

// 4. Create router, injecting the controller
const notesRouter = createNotesRouter(notesController);
const authRouter = createAuthRouter(authController);
// --- API Routes ---
app.use('/api/users', authRouter);
app.use('/api/notes', protect, notesRouter)


// --- Serve Frontend ---
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
//   });
// }

// --- Start Server ---
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});