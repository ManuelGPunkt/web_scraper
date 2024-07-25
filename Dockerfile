FROM ubuntu:14.04

MAINTAINER Mark Becher

WORKDIR /usr/local/apache2/htdocs/

RUN apt-get update && \
apt-get install -y apache2 && \
apt-get clean

COPY ./web_interface/ /usr/local/apache2/htdocs/

CMD ["bash", "-c", "ls -a && echo \nApache\ Server\ running..."]
