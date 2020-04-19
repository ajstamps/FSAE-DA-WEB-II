FROM node:stretch-slim

COPY . ./FSAE-DA-WEB

#ARG HOST=127.0.0.1
#ARG PORT=80

RUN apt-get update
RUN yes | apt-get upgrade
RUN yes | apt-get install git
RUN yes | apt-get install apache2

RUN cd ./FSAE-DA-WEB && npm install --no-package-lock
RUN cd ./FSAE-DA-WEB && npm run rbuild
RUN cp -r ./FSAE-DA-WEB/build/* /var/www/html/

RUN echo "\nErrorDocument 404 /404/index.html" >> /etc/apache2/apache2.conf
#RUN echo "\nServerName ${HOST}" >> /etc/apache2/apache2.conf

EXPOSE 80
EXPOSE 22

CMD sh ./FSAE-DA-WEB/startup.sh