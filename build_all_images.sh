#!/bin/bash

for container in 'redis' 'entrypoint'
do
    $container/build_image.sh -p $container
done