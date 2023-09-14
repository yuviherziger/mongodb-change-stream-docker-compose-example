# MongoDB Change Stream Example

This example includes the following components in its docker-compose deployment:

1. `mongo`: A MongoDB 6.0 container with a single-node replica set.
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