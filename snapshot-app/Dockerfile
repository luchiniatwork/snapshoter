FROM debian:jessie

MAINTAINER Tiago Luchini <luchini@work.co>

# Add 'web' user which will run the application
RUN adduser web --home /home/web --shell /bin/bash --disabled-password --gecos ""

# Clean the apt cache off of any potential trash
RUN rm -rf /var/lib/apt/list/*

# Install linux dependencies
RUN apt-get -y update &&\
    apt-get install -y \
    nano \
    curl \
    libfreetype6 \
    libfontconfig \
    nodejs \
    npm \
    git

# Node.js on Debian has a funcky bin. Symlink it to a more traditional.
RUN ln /usr/bin/nodejs /usr/bin/node

# Node.js will be on port 9000
EXPOSE 3000

# Here's were our stuff happens
RUN mkdir /var/www
WORKDIR /var/www

# Install Node modules
ADD package.json /var/www/
RUN npm install
RUN chown -R web:web /var/www

# Install app's code
ADD src /var/www/src
RUN chown -R web:web /var/www

USER web

CMD ["node", "src/index.js"]