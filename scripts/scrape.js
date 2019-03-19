// Dependencies
const request = require("request");
const cheerio = require("cheerio");

// scraper ------------------------------------

let scrape = cb => {
  request(
    "https://www.epictv.com/media/series-home/climbing-daily/230997",
    (err, res, body) => {
      let $ = cheerio.load(body);
      let articles = [];
      $(".epictv-london-video-archive-wrapper")
        .find(".content")
        .each(function(i, element) {
          let episode = $(this)
            .find(".episode-number")
            .text()
            .trim();
          let head = $(this)
            .find(".media-title")
            .text()
            .trim();

          if (episode && head) {
            let episodeNeat = episode
              .replace(/(\r\n|\n|\r|\t|\s+)/gm, " ")
              .trim();
            let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            let dataToAdd = {
              episodemary: episodeNeat,
              headline: headNeat
            };

            articles.push(dataToAdd);
          }
        });

      cb(articles);
    }
  );
};

module.exports = scrape;
