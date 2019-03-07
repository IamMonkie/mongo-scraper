//dependencies
const Note = require("../models/note");
const makeDate = require("../scripts/date");

module.exports = {
  get: (data, cb) => {
    Note.find(
      {
        _headlineId: data_id
      },
      cb
    );
  },
  save: (data, cb) => {
    let newNote = {
      _headlineId: data._id,
      date: makeDate(),
      noteText: data.noteText
    };

    Note.create(newNote, (err, doc) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Doc: ${doc}`);
        cb(doc);
      }
    });
  },

  delete: (data, cb) => {
    Note.remove(
      {
        _id: data._id
      },
      cb
    );
  }
};
