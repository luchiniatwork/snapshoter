#!/bin/bash

echo "Refreshing kue-ui container"

echo "- stopping any running container"
docker stop kue-ui

echo "- removing any running container"
docker rm kue-ui

echo "- running new container"
docker run \
  --name kue-ui \
  --link redis:redis \
  -p 3001:3000 \
  -d \
  kue-ui \
  node src/index.js