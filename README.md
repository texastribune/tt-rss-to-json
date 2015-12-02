# RSS to JSON

A quick fix while The Texas Tribune's API catches up! Converts our summmary RSS feeds into usable JSON and pushes them up to S3.

## Setup and Usage (without Docker)

First, install dependencies.

```sh
npm install
```

Then, you'll need to make the `aws-sdk` library happy with AWS credentials. There are multiple ways to do this, so [pick your poison](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html). (I recommend the env variables if you do not already have the `~/.aws/credentials` file set up.)

You'll also need to set the `AWS_S3_BUCKET` environmental variable so the library knows where to push the files.

The feeds that will be pulled in are listed in `source.js`. Add or edit to that if necessary, then run the start command.

```sh
npm start
```

## Setup and Usage (with Docker)

Build the container using the handy Make command.

```sh
make docker/build
```

Then you need to figure out how to get the AWS credentials and bucket location in. You can either go the env variable file route, or pass them in directly when you `docker run`.

If you went the file route:

```sh
docker run -it --rm --env-file=env-docker rsstojson
```

And the direct env variable route:

```sh
docker run -it --rm --env AWS_ACCESS_KEY_ID=... --env AWS_SECRET_ACCESS_KEY=... --env AWS_S3_BUCKET=... rsstojson
```
