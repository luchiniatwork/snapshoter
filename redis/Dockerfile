FROM debian:jessie

MAINTAINER Tiago Luchini <luchini@work.co>

# Clean the apt cache off of any potential trash
RUN rm -rf /var/lib/apt/list/*

# Install linux dependencies
RUN apt-get -y update &&\
    apt-get install -y \
    nano \
    curl \
    redis-server

# Redis will be on port 6379
EXPOSE 6379

ADD redis.conf /home/redis/
RUN chown -R redis:redis /home/redis

USER redis

CMD ["redis-server", "/home/redis/redis.conf"]