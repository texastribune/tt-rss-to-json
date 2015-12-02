var AWS = require('aws-sdk')
var zlib = require('zlib')

var BUCKET = process.env.AWS_S3_BUCKET

var s3 = new AWS.S3({params: {Bucket: BUCKET}})

function uploadToS3 (string, slug) {
  var buffer = new Buffer(string, 'utf-8')

  zlib.gzip(buffer, function (err, compressed) {
    if (err) return console.error(err)

    s3.upload({
      Key: slug,
      Body: compressed,
      CacheControl: 'max-age=' + (60 * 60), // one hour
      ContentEncoding: 'gzip',
      ContentType: 'application/json'
    }, function (err, status) {
      if (err) return console.error(err)

      console.log(status)
    })
  })
}

module.exports = uploadToS3
