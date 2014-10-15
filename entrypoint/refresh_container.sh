#!/bin/bash

echo "Stopping any running container"
docker stop entrypoint

echo "Removing any running container"
docker rm entrypoint

echo "Running new container"
docker run \
  --name entrypoint \
  --link redis:redis \
  -p 9000:9000 \
  -d \
  entrypoint \
  node src/index.js