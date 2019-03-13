// Dependencies
const scrape = require("../scripts/scrape");
const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

//-----------------------------------------------

module.exports = router => {
  // this route renders the homepage
  router.get("/", (req, res) => {
    res.render("index");
  });

  //-----------------------------------------------

  // this route renders the handlebars page
  router.get("/saved", (req, res) => {
    res.render("saved");
  });

  //-----------------------------------------------

  //fetch articles
  router.get("/api/fetch", (req, res) => {
    res.json({ message: "No new articles. Try again later." });

    headlinesController.fetch((err, docs) => {
      console.log(docs);
    });

    // if (!docs || docs.insertedCount === 0) {
    //   res.json({ message: "No new articles. Try again later." });
    // } else {
    //   res.json({ message: "Added " + docs.insertedCount + " new articles!" });
    // }
    // });
  });

  //-----------------------------------------------

  //get saved
  router.get("/api/headlines", (req, res) => {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }

    //get  (default)
    headlinesController.get(query, data => {
      res.json(data);
    });
  });

  //-----------------------------------------------

  //delete article
  router.delete("/api/headlines:id", (req, res) => {
    let query = {};
    query._id = req.params.id;
    headlinesController.delete(query, (err, data) => {
      res.json(data);
    });
  });

  //-----------------------------------------------

  //update articles
  router.patch("api/headlines", (req, res) => {
    headlinesController.update(req.body, (err, data) => {
      res.json(data);
    });
  });

  //-----------------------------------------------

  //get notes

  router.get("api/notes:headline_id?", (req, res) => {
    let query = {};
    if (req.params.headLine_id) {
      query.id = req.params.headline_id;
    }

    notesController.get(query, (err, data) => {
      res.json(data);
    });
  });

  //-----------------------------------------------

  //delete notes
  router.delete("/api/notes:id", (req, res) => {
    let query = {};
    query._id = req.params.id;
    notesController.delete(query, (err, data) => {
      res.json(data);
    });
  });

  //-----------------------------------------------

  //post new note to article
  router.post("/api/notes", (req, res) => {
    notesController.save(req.body, data => {
      res.json(data);
    });
  });
};
