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
  -e KUE_USERNAME=admin \
  -e KUE_PASSWORD=mypass \
  -d \
  kue-ui