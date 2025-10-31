const express = require('express');
const app = express();
const PORT = 3000;

// In-memory data store
let notes = [];
let nextId = 1;

// Middleware: JSON parser
app.use(express.json());

// Middleware: Logger
app.use((req, res, next) => {
  console.log(`[${req.method}] Request made to ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Middleware: Validation
const validateNote = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required'
    });
  }
  next();
};

// GET /notes - Get all notes
app.get('/notes', (req, res) => {
  res.json({ success: true, data: notes });
});

// GET /notes/:id - Get note by ID
app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }
  res.json({ success: true, data: note });
});

// POST /notes - Create new note
app.post('/notes', validateNote, (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  notes.push(newNote);
  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: newNote
  });
});

// PUT /notes/:id - Update note
app.put('/notes/:id', validateNote, (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }
  note.title = req.body.title;
  note.content = req.body.content;
  res.json({
    success: true,
    message: 'Note updated successfully',
    data: note
  });
});

// DELETE /notes/:id - Delete note
app.delete('/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Note not found' });
  }
  notes.splice(index, 1);
  res.json({ success: true, message: 'Note deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
