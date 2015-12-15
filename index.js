var feedToJson = require('./convert')
var source = require('./source')
var uploadToS3 = require('./publish')

function convertFeed (slug, url) {
  feedToJson(url, function (data) {
    uploadToS3(data, slug)
  })
}

for (var feed in source) {
  if (source.hasOwnProperty(feed)) {
    var slug = feed
    var url = source[slug]

    convertFeed(slug, url)
  }
}
