import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimiter from './middleware/reteLimiter.js';
import path from 'path';

dotenv.config();
const app = express();
const __dirname =  path.resolve();





// Middleware
app.use(express.json());
if(process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
  });
} 
app.use(cors({origin:'http://localhost:5173'}));
app.use(rateLimiter);
app.use('/api/notes', notesRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost: '+process.env.PORT);
});
})



