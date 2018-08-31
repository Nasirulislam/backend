# ☁️ GZM Backend
[![Build Status](https://travis-ci.org/gzm-stack/backend.svg?branch=master)](https://travis-ci.org/gzm-stack/backend)
[![codecov](https://codecov.io/gh/gzm-stack/backend/branch/master/graph/badge.svg)](https://codecov.io/gh/gzm-stack/backend)

This repo contains the backend stack to support GZM apps.

The stack consists of two different services:

- **application-service**: That contains the backend application
- **database-service**: Provides persistence to the application-service

## Build and run

The stack can be easily launched by using the script `bootstrap.sh` that can be found in the root path of this project. 

As a result of running this script a couple of Docker containers (application and database services respectively) will be created and launched. By default, they will start listening to requests on the port 3000.

## API Documentation

Further information about the API endpoints can be found [here](./docs/index.md)
