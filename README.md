# GZM Backend
[![Build Status](https://travis-ci.org/gzm-stack/backend.svg?branch=master)](https://travis-ci.org/gzm-stack/backend)

This repo contains the backend stack to support GZM apps.

The stack consists in two different services:

- **application-service**: That contains the backend application
- **database-service**: Provides persistency to the application-service

## Build and run

The stack can be easily launched by using the script `bootstrap.sh` that can be found in the root path of this project. 

As result of running this script a couple of Docker containers (application and database services respectively) will be created and launched. By default they will start listening for request on the port 3000.

## API Documentation

Further information about the API endpoints can be found [here](./docs/index.md)
