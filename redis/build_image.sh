#!/bin/bash

while getopts ":p:" optname
do
  case "$optname" in
    "p")
      path=$OPTARG'/'
      ;;
  esac
done

echo "Building redis container" 
docker build -t redis $path.