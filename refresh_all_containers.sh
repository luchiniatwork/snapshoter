#!/bin/bash

for container in 'redis' 'entrypoint'
do
    $container/refresh_container.sh
done