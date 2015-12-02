var feedToJson = require('./convert')
var source = require('./source')
var uploadToS3 = require('./publish')

for (var feed in source) {
  if (source.hasOwnProperty(feed)) {
    var slug = feed
    var url = source[slug]

    feedToJson(url, function (data) {
      uploadToS3(data, slug)
    })
  }
}
