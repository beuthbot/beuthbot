#!/usr/bin/env bash

# print commands
set -x

# short and simple bash script for simplifying deployment process on
# on productive machine.  make shure there is a `.env` file specifying
# the needed endpoints and tokens.


# check preconditions
if ! foobar_loc="$(type -p "git")" || [[ -z $foobar_loc ]]; then
   echo "Can't find git command. Is it installed?" && exit 0
fi

if ! foobar_loc="$(type -p "docker-compose")" || [[ -z $foobar_loc ]]; then
   echo "Can't find docker-compose command. Is it installed?" && exit 0
fi


# reset git project
git reset HEAD --hard

# reset submodules (including nested submodules)
git submodule foreach --recursive 'git reset --hard'

# pull all changes in the repo including changes in the submodules
git pull --recurse-submodules

# rebuild and start docker container
docker-compose up --build -d
