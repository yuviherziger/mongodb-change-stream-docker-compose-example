const { MongoClient } = require('mongodb');
const axios = require('axios');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function watchCollection() {
  await sleep(5000);
  const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/?replicaSet=rs0';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB_NAME || 'cstestdb');
    const collection = database.collection(process.env.MONGO_COLL_NAME || 'cstestcoll');

    const changeStream = collection.watch();

    changeStream.on('change', (change) => {
      axios.post("http://receiver:8000/handle-event", change).then(resp => console.log(resp))
    });

    changeStream.on('error', (error) => {
      console.error('Error:', error);
    });
    let iter = 0;
    while (true) {
      await collection.insertOne({ iter, message: "Hello from watcher" });
      iter++;
      await sleep(1000);
    }

    // Keep the change stream open indefinitely
    await new Promise(() => {});
  } finally {
    await client.close();
  }
}

watchCollection().catch(console.error);
