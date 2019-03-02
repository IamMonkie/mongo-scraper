module.exports = function(router) {
  // this route renders the homepage
  router.get("/", function(req, res) {
    res.render("index");
  });
  // this route renders the handlebars page
  router.get("/saved", function(req, res) {
    res.render("saved");
  });
};
