FROM node:18-alpine

WORKDIR watcher

COPY package.json .
COPY watcher.js .
RUN npm i

CMD [ "node", "watcher.js" ]

