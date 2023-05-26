FROM node:16

RUN apt-get update -qq  && apt-get install

RUN mkdir "/sampleNode"

WORKDIR ./sampleNode

COPY . .

RUN yarn
RUN npm install -g npm@9.2.0

EXPOSE 3001
CMD [ "node", "src/app/server.js" ]
