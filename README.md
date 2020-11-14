# BeuthBot

![Icon](.documentation/BeuthBotIcon100.png "Icon")

> An enormously intelligent, messenger-independent chatbot.

## Contents

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Project Structure / Packages](#Project-Structure-/-Packages)
  - [Components Model](#Components-Model)
- [Components](#Components)
- [Overview of Docker containers](#Overview-of-Docker-containers)
- [Domain](#Domain)
- [Technologies](#Technologies)
- [Motivation](#Motivation)
- [BeuthBot Clients](#BeuthBot-Clients)
- [Authors](#Authors)

## Requirements

#### Release

* `Docker` version 19.03.8
* `docker-compose ` version 1.25.0

#### Development

* `Docker` version 19.03.8
* `docker-compose ` version 1.25.0
* `node` & `npm` (Optional)
* The IDE of your choice

[Installation instructions for Docker](https://docs.docker.com/install/)

Lower versions of `Docker` and `docker-compose ` may work but are not tested.

## Installation

This repository uses submodules, and will not run unless you clone recursively.

```shell script

# clone project
$ git clone --recursive https://github.com/beuthbot/beuthbot.git

# or with ssh
$ git clone --recursive git@github.com:beuthbot/beuthbot.git

# change into directory
$ cd beuthbot

# edit environment file
$ cp .env.sample .env && vim .env

# create network
docker network create beuthbot_network

# start BeuthBot
$ docker-compose up -d

# check whether the gateway is running on port 3000
$ curl http://localhost:3000          # prints: Hello from BeuthBot Gateway
```

For development you may want to start the docker containers seperatly. There are `docker-compose.yml` files in each (sub)project which can be used to start the services in serperate containers. You can simply start the `Node.js` server, too, for some projects without using docker. Note that the table under [Default Ports of Services](#Default Ports of Services) gives you an overview about the ports used by the containers and about the port mapping.

### Working with Submodules

For easier access this repository uses [Makefile](./Makefile), so you might not need to handle submodules manually.

##### Pulling with submodules

```shell
# pull all changes in the repo including changes in the submodules
git pull --recurse-submodules

# pull all changes for the submodules
git submodule update --remote
```
or
```
make update
```

##### Executing a command on every submodule

```shell
# reset each submodule
git submodule foreach 'git reset --hard'

# including nested submodules
git submodule foreach --recursive 'git reset --hard'
```
or
```
make reset
```
##### Known Issues

When you are developing a submodule and want to push the updates you may get an error saying "HEAD detached at ...". If so, you need to checkout a brancht. Mostly the `master`.

``` shell script
$ git checkout master
```

Have a look on this [page](https://www.vogella.com/tutorials/GitSubmodules/article.html) for further information about git submodules.

### Makefile

Check out the [Makefile](./Makefile) of the repository it bundles some common tasks for an convenience use with `make`.

This makefile is the **single source of truth** regarding operation of BHT-BOT. 
So it's also part of the CI CD automation

```
$ make 
targets:
  up               Run docker-compose
  test             Run tests
  update           Checkout $DATE_TAG (from env, default master) and pull repository with submodules
  upgrade          Checkout every submodules current master branch
  release          Executed (by CI/CD Pipeline) for rolling out a release-tag
  reset            !DANGER! Will delete all unsaved changes in repo and submodules
```

### Releases & CI / CD

BHT-Bot is automatically released to production server by executing the related [deployment-workflow](./.github/workflows/deploy.yml)

Only commits with named-tags with version-number will be deployed. Example for a v3 release could look like:
```
git commit -m 'Collected v3 features'
git tag v3.0.0
git push --tags
```

Deployment will execute 3 stages: Build, Test and Deploy. The Test and Deploy stages will be called from [Makefile](./Makefile) test and deploy commands. 

The Deployment process is handled by a self-hosted runner. For Contributers check [Selfhosted Runner Documentation](./.documentation/github-runner.md)

## Project Structure / Components

#### Submodules

| **Packagename** | **About** | **Language** |
| --------------- | --------- | :----------: |
| [gateway](https://github.com/beuthbot/gateway) | Receives messages from bot clients via a API. | JS |
| [deconcentrator-js](https://github.com/beuthbot/deconcentrator-js) | Asks multiple NLU processors for the interpretation of a given message | JS |
| [rasa](https://github.com/beuthbot/rasa) | NLU | Python |
| [registry](https://github.com/beuthbot/registry) | The registry of services. It knows all existing services and handles the requests against these services. | JS |
| [mensa](https://github.com/beuthbot/mensa) | The mensa service of the BeuthBot. It knows whether the Mensa is open or closed. | JS |
| [weather](https://github.com/beuthbot/weather) | The weather service. | JS |

#### Other Packages

| **Packagename** | **About** | **Language** |
| --------------- | --------- | :----------: |
| .documentation | Contains mostly text, image and markdown files with information and documentation about this repository. | - |
| scripts | Contains scripts to automate tasks. | BASH |

### Components Model

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/components.txt)

## Overview of Docker containers

| Container | Internal Port | External Port | Docker Image |
| ------- | ------------: | ------------: | --- |
| [gateway](https://github.com/beuthbot/gateway) | 3000 | 3000 | node:11-alpine |
| [deconcentrator-js](https://github.com/beuthbot/deconcentrator-js) | 8338 | 8338 |node:11-alpine|
| [rasa](https://github.com/beuthbot/rasa) | 5005 | 5005 |rasa/rasa:1.6.0-spacy-de|
| :arrow_right_hook: rasa/duckling | 8000 | 8000 (optional) |rasa/duckling:0.1.6.2|
| [database](https://github.com/beuthbot/database) | 3000 | 27000 |node:11-alpine|
| :arrow_right_hook: mongo | 27017 | 27017 |mongo:4.0.4|
| [database_microservice](https://github.com/beuthbot/mensa) | 3000 | 27016 |node:11-alpine|
| [registry](https://github.com/beuthbot/registry) | 3000 | 9922 |node|
| [mensa](https://github.com/beuthbot/mensa) | 8000 | 9950 |node:11-alpine|
| [weather](https://github.com/beuthbot/weather) | 7000 | 9951 |node:11-alpine|

## Domain

For a detailed Model of the domain the this [link](.documentation/DOMAIN.md).

## Technologies

The BeuthBot project is mostly developed in JavaScript.

#### Development

* `Docker`
* `docker-compose `
* `node` & `npm`

#### Deployment

* `Docker` (Tested with version 19.03.8)
* `docker-compose ` (Tested with version 1.25.0)

## Motivation

Fulfilling the following requirements ([Link](https://wiki.ziemers.de/doku.php?id=wiki:software:beuthbot:berichte:ws2019:zwischen#Requirement+Analysis+BeuthBot), Section: 'Requirement Analysis BeuthBot') `/NF300/`, `/NF301/`, `/NF302/`, `/NF400/` it's obvious to have the BeuthBot splitted up into many (small) repositories. Especially when having the requirements to have the project as modular as possible and to have the project easy extendable. 

#### BeuthBot's structure before this repository:

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/repositories-old.txt)

But when deploying on a (productive) machine we faced the problem cloning at least a half-dozen repositories, editing the `.env` files of these projects and invoking each `docker-compose.yml` individually. This means at least typing in the following commands **six** times:

```shell script
# clone repository
$ git clone https://github.com/beuthbot/$PROJECT_NAME.git

# change into directory
$ cd $PROJECT_NAME

# edit environment file
$ cp .env.sample .env && vim .env

# start project
$ docker-compose up -d
```

Not even for us this is / was a huge workload before starting development and / or when deploying the project. Facing this problem we started writing bash scripts updating and editing these projects. But in the end that didn't felt right so we decided having a master project (this repository) containing and combing the packages of the BeuthBot and making it possible running the whole system with one `.env` and one `docker-compose.yml` file.

> We **did not** remove the `docker-compose.yml` files of the components in order to have the option to start all services seperatly.

#### BeuthBot's structure with this repository:

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/repository.txt)

With this repository it became way easier to manage, develope and deploy the BeuthBot. The following collection of commands which can be used to **fully** deploy the BeuthBot demonstrates that. Note the `--recursive` argument for the git `clone` command which make git fetching the submodules, too. Have a look at the section [Working with Submodules](#Working-with-Submodules) for further information about working with submodules. 

```shell script
# clone project
$ git clone --recursive https://github.com/beuthbot/beuthbot.git

# change into directory
$ cd beuthbot

# edit environment file
$ cp .env.sample .env && vim .env

# start BeuthBot
$ docker-compose up -d
```

> Having this project organized with submodules allows us having a global state or version of the BeuthBot. It further makes it easier to have and organize multiple **distributions** of this project.

## BeuthBot Clients

* [telegram-bot](https://github.com/beuthbot/telegram-bot)



## `docker-compose` Cheat Sheet

```bash
# build and start Containers && serve at localhost:5005 (rasa) and at localhost:8000 (duckling)
$ docker-compose up

# stop and remove rasa-containers, volumes, images and networks
$ docker-compose down

# do the same steps as "docker-compose down" 
# additionally remove declared volumes in Docker-Compose-File
$ docker-compose down -v

# lists running containers
$ docker ps

# connect to the container with a bash
$ docker exec -it <Container-ID> bash
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available see [tags on this repository](https://github.com/beuthbot/beuthbot/releases)

## Authors

* Lukas Danckwerth - Initial work - [GitHub](https://github.com/lukasdanckwerth)

See also [here](https://github.com/beuthbot/beuthbot/graphs/contributors) for a list of contributors
