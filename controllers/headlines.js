//dependencies
const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/date");
const Headline = require("../models/headlines");

module.exports = {
  fetch: cb => {
    scrape(function(data) {
      let articles = data;
      for (let i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }

      Headline.collection.insertMany(
        articles,
        { ordered: false },
        (err, docs) => {
          cb(err, docs);
        }
      );
    });
  },
  delete: (query, cb) => {
    Headline.remove(query, cb);
  },
  get: (query, cb) => {
    Headline.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  update: (query, cb) => {
    Headline.update(
      {
        _id: query._id
      },
      {
        $set: query
      },
      {},
      cb
    );
  }
};

//might need to replace articles with results
