FROM node:stretch-slim

COPY . ./FSAE-DA-WEB

#ARG HOST=127.0.0.1
#ARG PORT=80

# RUN npm config set unsafe-perm true

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

#   "dependencies": {
#     "@testing-library/jest-dom": "^5.7.0",
#     "@testing-library/react": "^10.0.4",
#     "@testing-library/user-event": "^10.1.1",
#     "c3": "^0.7.15",
#     "electron-is-dev": "^1.2.0",
#     "electron-packager": "^14.2.1",
#     "electron-store": "^5.1.1",
#     "evergreen-ui": "^4.27.4",
#     "is-electron": "^2.2.0",
#     "lodash": "^4.17.15",
#     "react": "^16.13.1",
#     "react-c3-component": "^2.0.0",
#     "react-c3js": "^0.1.20",
#     "react-dom": "^16.13.1",
#     "react-rnd": "^10.1.10",
#     "react-router": "^5.1.2",
#     "react-router-dom": "^5.1.2",
#     "react-scripts": "^3.4.1",
#     "semantic-ui-css": "^2.4.1",
#     "semantic-ui-react": "^0.88.2",
#     "source-map-support": "^0.5.19"
#   },
#   "devDependencies": {
#     "cross-env": "^7.0.2",
#     "electron": "^8.2.5",
#     "electron-builder": "^22.6.0",
#     "electron-reload": "^1.5.0",
#     "electron-webpack": "^2.8.2",
#     "nodemon": "^2.0.3",
#     "npm-run-all": "^4.1.5",
#     "wait-on": "^5.0.0"
#   }