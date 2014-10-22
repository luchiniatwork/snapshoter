#!/bin/bash

while getopts ":p:" optname
do
  case "$optname" in
    "p")
      path=$OPTARG'/'
      ;;
  esac
done

echo "Building worker container" 
docker build -t worker $path.