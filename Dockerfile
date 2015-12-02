FROM node:5.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

ENV AWS_S3_BUCKET "rsstojson.texastribune.org"

CMD ["npm", "start"]
