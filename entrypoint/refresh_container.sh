#!/bin/bash

echo "Stopping any running container"
docker stop entrypoint

echo "Removing any running container"
docker rm entrypoint

echo "Running new container"
docker run \
  --name entrypoint \
  --link redis:redis \
  -p 3000:3000 \
  -d \
  entrypoint \
  node src/index.js