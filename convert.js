var cheerio = require('cheerio')
var got = require('got')
var moment = require('moment')
var parseString = require('xml2js').parseString

function feedToJson (feedUrl, cb) {
  got.get(feedUrl, readXml)

  function readXml (err, body) {
    if (err) throw err

    parseString(body, convertFeed)
  }

  function convertFeed (err, feedText) {
    if (err) throw err

    var feed = feedText.rss.channel[0]
    var output = {}

    output.lastUpdated = convertDate(feed.lastBuildDate[0]).format()
    output.data = feed.item.map(convertStory)

    cb(JSON.stringify(output))
  }

  function convertStory (story) {
    var storyTitle = story.title[0]
    var storyUrl = story.link[0].split('?')[0]
    var storyPubDate = convertDate(story.pubDate[0]).format('l')

    var $ = cheerio.load(story.description[0])
    var storyDescription = $('p').text()
    var storyImageSrc = $('img').attr('src')
    var storyImage = storyImageSrc ? storyImageSrc.replace('312x1000', '155x155_crop') : null

    return {
      title: storyTitle,
      url: storyUrl,
      pubDate: storyPubDate,
      description: storyDescription,
      leadArt: storyImage
    }
  }

  function convertDate (input) {
    return moment(input, 'ddd, DD MMM YYYY HH:mm:ss ZZ')
  }
}

module.exports = feedToJson
