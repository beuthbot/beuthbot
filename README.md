# BeuthBot

![Icon](.documentation/BeuthBotIcon100.png "Icon")

> An enormously intelligent, messenger-independent chatbot.

## Requierments

#### Production

* Docker version 19.03.8
* docker-compose version 1.25.0

#### Development

* Docker version 19.03.8
* docker-compose version 1.25.0

## Installation

Thie repository uses submodules, and will not run unless you clone recursively.

```shell script

# clone project
$ git clone --recursive https://github.com/beuthbot/beuthbot.git

# or with ssh
$ git clone --recursive git@github.com:beuthbot/beuthbot.git

# change into directory
$ cd beuthbot

# edit environment file
$ cp .env.sample .env && vim .env

# start BeuthBot
$ docker-compose up -d

# check whether the gateway is running on port 3000
$ curl http://localhost:3000          # prints: Hello from BeuthBot Gateway
```

For development you may want to start the docker containers seperatly. There are `docker-compose.yml` files in each (sub)project which can be used to start the services in serperate containers. You can simply start the `Node.js` server, too, for some projects without using docker. Note the following table which gives an overview about the ports used by the containers and about the port mapping.

## Default Ports

| Service | External Port | Internal Port |
| ------- | ------------: | ------------: |
| gateway           | 3000 | 3000 |
| deconcentrator-js | 8338 | 8338 |
| rasa              | 5005 | 5005 |
| registry          | 9922 | 3000 |
| mensa             | 9950 | 8000 |
| weather           | 9951 | 7000 |

## Packages / Submodules

| **Packagename** | **About** |
| ----------- | ----- |
| gateway | Receives messages from bot clients via a API. |
| deconcentrator-js | Asks multiple NLU processors for the interpretation of a given message |
| rasa | tbd |
| registry | tbd |
| mensa | tbd |
| weather | tbd |

## Technologies

## Components Model

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/components.txt)

## Bot Clients

* [telegram-bot](https://github.com/beuthbot/telegram-bot)

## Authors

* [Abirathan](https://github.com/Abirathan)
* [Chr1ssy](https://github.com/Chr1ssy)
* [lukasdanckwerth](https://github.com/lukasdanckwerth)
* [nandtropy](https://github.com/nandtropy)
* [Onkilchen](https://github.com/Onkilchen)
* [T0biWan](https://github.com/T0biWan)
* [Kai Nessig](https://github.com/tiberius)
* [Timo Bruns](https://github.com/TimoBruns)

