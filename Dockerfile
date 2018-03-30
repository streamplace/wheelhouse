FROM ubuntu:xenial

RUN apt-get update \
  && apt-get -y install docker.io curl software-properties-common python-software-properties jq

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash \
  && apt-get install -y nodejs \
  && npm install -g yarn

RUN cd /tmp \
  && curl -L -o helm.tar.gz https://storage.googleapis.com/kubernetes-helm/helm-v2.8.2-linux-amd64.tar.gz \
  && tar xzvf helm.tar.gz \
  && mv linux-amd64/helm /usr/bin/helm \
  && rm -rf helm.tar.gz linux-amd64
