#!/bin/bash

# Wait a bit
sleep 10

# Start MongoDB
mongosh "mongodb://mongo:27017" --eval "rs.initiate()"
