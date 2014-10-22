#!/bin/bash

for container in 'redis' 'entrypoint' 'kue-ui' 'worker'
do
    $container/refresh_container.sh
done