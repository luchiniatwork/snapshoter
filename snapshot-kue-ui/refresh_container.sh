#!/bin/bash

echo "Refreshing snapshot-kue-ui container"

echo "- stopping any running container"
docker stop snapshot-kue-ui

echo "- removing any running container"
docker rm snapshot-kue-ui

echo "- running new container"
docker run \
  --name snapshot-kue-ui \
  --link snapshot-redis:redis \
  -p 3001:3000 \
  -e KUE_USERNAME=admin \
  -e KUE_PASSWORD=mypass \
  -d \
  snapshot-kue-ui