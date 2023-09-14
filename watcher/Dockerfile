FROM node:18-alpine

WORKDIR watcher

COPY package.json .
COPY watcher.js .
RUN npm i

CMD [ "node", "watcher.js" ]

# CMD ["bash", "-c", "sleep 5 && uvicorn receiver.app:app"]