#!/bin/bash

echo "Refreshing entrypoint container"

echo "- stopping any running container"
docker stop entrypoint

echo "- removing any running container"
docker rm entrypoint

echo "- running new container"
docker run \
  --name entrypoint \
  --link redis:redis \
  -p 3000:3000 \
  -d \
  entrypoint