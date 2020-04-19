#!/bin/bash
DIRECTORY := $(shell pwd)
VERSION := $(shell node -pe "require('${DIRECTORY}/package.json').version")
APPNAME := fsae-da-web

FSAE-DA-WEB.dockerfile: Dockerfile startup.sh
	sudo docker build -t ${APPNAME}:${VERSION} .