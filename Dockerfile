FROM ubuntu:14.04

MAINTAINER Mark Becher

WORKDIR /usr/local/apache2/htdocs/

RUN apt-get update && \
apt-get install -y apache2 && \
apt-get install python3 && \
apt-get clean

RUN pip3 install Flask

COPY . /usr/local/apache2/htdocs/
COPY ./web_interface/ /usr/local/apache2/htdocs/

CMD ["bash", "-c", "ls -a && echo \n && python3 Flask_Server.py"]
