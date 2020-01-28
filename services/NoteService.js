const MongoDbRepo = require('../repository/mongoDbRepo');

class NoteService {
  constructor() {
    this.NoteRepository = new MongoDbRepo('Notes');
  }

  createNote(opt) {
    return this.NoteRepository.create(opt);
  }

  getAllNotes() {
    return this.NoteRepository.getAll();
  }

  updateNote(_id, opt) {
    return this.NoteRepository.updateOne(_id, opt);
  }

  deleteNote(_id) {
    return this.NoteRepository.deleteOne(_id);
  }
}

module.exports = NoteService;
