#!/bin/bash

echo "Refreshing snapshot-app container"

echo "- stopping any running container"
docker stop snapshot-app

echo "- removing any running container"
docker rm snapshot-app

echo "- running new container"
docker run \
  --name snapshot-app \
  --link snapshot-redis:redis \
  -p 3000:3000 \
  -e CACHE_LIFETIME=5000 \
  -d \
  snapshot-app


echo "Refreshing snapshot-worker container"

echo "- stopping any running container"
docker stop snapshot-worker

echo "- removing any running container"
docker rm snapshot-worker

echo "- running new container"
docker run \
  --name snapshot-worker \
  --link snapshot-redis:redis \
  -d \
  snapshot-app \
  node src/worker.js