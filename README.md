# MongoDB Change Stream & Docker Compose Example

This example includes the following components in its docker-compose deployment:

1. `mongo`: A MongoDB 6.0 container with a single-node replica set.  It has to be a replica set in order for
   change streams to function.
2. `receiver`: A simple Python web service open for POST requests with some arbitrary payload. It logs the payload each
   time it receives such POST request.
3. `watcher`: A simple Node.js app that establishes a connection to the MongoDB replica set, registers a change
   stream event listener and inserts documents to a collection infinitely, in 1-second intervals.

How to run this example:

1. Start the Docker deployment:

    ```shell
    docker-compose up --detach --build
    ```

2. Initialize the Replica Set:

    ```shell
    mongosh "mongodb://localhost:27017" --eval "rs.initiate()"
    ```

3. Tail the `receiver` container, which is a simple web service receiving events from the change stream
   from the `watcher` container, where the change stream runs and inserts documents infinitely, in 1 second intervals.

    ```shell
    docker-compose logs -f receiver
    ```
   
You should then see logs along the following lines: 

```
change-streams-ex-receiver-1  | INFO:     172.31.0.5:58190 - "POST /handle-event HTTP/1.1" 200 OK
change-streams-ex-receiver-1  | Received message: {"_id": {"_data": "8265031FF0000000012B022C0100296E5A10040CDC634C37444E93900D360AE380A0EE46645F6964006465031FF0A5030D125EEC78B40004"}, "operationType": "insert", "clusterTime": {"$timestamp": "7278696538413465601"}, "wallTime": "2023-09-14T15:00:00.533Z", "fullDocument": {"_id": "65031ff0a5030d125eec78b4", "iter": 624, "message": "Hello from watcher"}, "ns": {"db": "cstestdb", "coll": "cstestcoll"}, "documentKey": {"_id": "65031ff0a5030d125eec78b4"}}
```

These events are coming from the change stream.
