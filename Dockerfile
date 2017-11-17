FROM ubuntu:xenial

RUN apt-get update && apt-get -y install docker.io curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash && apt-get install -y nodejs
RUN npm install -g npm
