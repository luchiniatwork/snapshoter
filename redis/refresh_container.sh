#!/bin/bash

echo "Stopping any running container"
docker stop redis

echo "Removing any running container"
docker rm redis

echo "Running new container"
docker run \
  --name redis \
  -d \
  redis \
  redis-server /home/redis/redis.conf