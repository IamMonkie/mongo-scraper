// Dependencies
const request = require("request");
const cheerio = require("cheerio");

// scraper ------------------------------------

let scrape = cb => {
  request(
    "https://www.epictv.com/media/series-home/climbing-daily/230997",
    (err, res, body) => {
      let $ = cheerio.load(body);
      let results = [];
      $(".content").each(function(i, element) {
        let head = $(this)
          .children(".picture")
          .text()
          .trim();
        let sum = $(this)
          .children(".media-title")
          .text()
          .trim();

        if (head && sum) {
          let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
          let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

          let dataToAdd = {
            headline: headNeat,
            summary: sumNeat
          };

          results.push(dataToAdd);
        }
      });
      cb(results);
    }
  );
};

module.exports = scrape;
