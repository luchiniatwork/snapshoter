#!/bin/bash

echo "Refreshing snapshot-redis container"

echo "- stopping any running container"
docker stop snapshot-redis

echo "- removing any running container"
docker rm snapshot-redis

echo "- running new container"
docker run \
  --name snapshot-redis \
  -P \
  -d \
  snapshot-redis