#!/bin/bash

for dockerPath in 'snapshot-redis' 'snapshot-app' 'snapshot-kue-ui'
do
    $dockerPath/build_image.sh -p $dockerPath
done