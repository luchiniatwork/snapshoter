#!/bin/bash

echo "Refreshing worker container"

echo "- stopping any running container"
docker stop worker

echo "- removing any running container"
docker rm worker

echo "- running new container"
docker run \
  --name worker \
  --link redis:redis \
  -d \
  worker \
  node src/worker.js