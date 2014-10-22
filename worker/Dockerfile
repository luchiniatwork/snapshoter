FROM debian:jessie

MAINTAINER Tiago Luchini <luchini@work.co>

# Add 'worker' user which will run the application
RUN adduser worker --home /home/worker --shell /bin/bash --disabled-password --gecos ""

# Clean the apt cache off of any potential trash
RUN rm -rf /var/lib/apt/list/*

# Install linux dependencies
RUN apt-get -y update &&\
    apt-get install -y \
    nano \
    curl \
    nodejs \
    npm \
    git

# Node.js on Debian has a funcky bin. Symlink it to a more traditional.
RUN ln /usr/bin/nodejs /usr/bin/node

# Here's were our stuff happens
RUN mkdir /var/worker
WORKDIR /var/worker

# Install Node modules
ADD package.json /var/worker/
RUN npm install
RUN chown -R worker:worker /var/worker

# Install app's code
ADD src /var/worker/src
RUN chown -R worker:worker /var/worker

USER worker

CMD ["node", "src/worker.js"]