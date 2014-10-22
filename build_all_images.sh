#!/bin/bash

for container in 'redis' 'entrypoint' 'kue-ui' 'worker'
do
    $container/build_image.sh -p $container
done