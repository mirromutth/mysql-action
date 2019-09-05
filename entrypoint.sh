#!/bin/sh

docker_run="docker run -e MYSQL_RANDOM_ROOT_PASSWORD=true"
docker_run="$docker_run -e MYSQL_DATABASE=$INPUT_MYSQL_DATABASE"
docker_run="$docker_run -e MYSQL_USER=$INPUT_MYSQL_USER"
docker_run="$docker_run -e MYSQL_PASSWORD=$INPUT_MYSQL_PASSWORD"
docker_run="$docker_run -d -p 3306:3306 mysql:$INPUT_MYSQL_VERSION"

sh -c "$docker_run"
