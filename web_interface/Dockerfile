FROM ubuntu:14.04

LABEL Mark Becher

WORKDIR /var/www/html/

RUN apt-get update && \
apt-get install -y apache2 && \
apt-get clean

ENV APACHE_FRONT_END_DIR /var/www/html/
ENV APACHE_LOG_DIR /var/log/apache2

EXPOSE 80

COPY . $APACHE_FRONT_END_DIR

ENTRYPOINT ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

