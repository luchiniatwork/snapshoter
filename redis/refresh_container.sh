#!/bin/bash

echo "Refreshing redis container"

echo "- stopping any running container"
docker stop redis

echo "- removing any running container"
docker rm redis

echo "- running new container"
docker run \
  --name redis \
  -P \
  -d \
  redis \
  redis-server /home/redis/redis.conf