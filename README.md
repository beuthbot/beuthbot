# BeuthBot

![Icon](.documentation/BeuthBotIcon100.png "Icon")

> An enormously intelligent, messenger-independent chatbot.

## Requierments

#### Production

* `Docker` version 19.03.8
* `docker-compose ` version 1.25.0

#### Development

* `Docker` version 19.03.8
* `docker-compose ` version 1.25.0
* `node` & `npm` (Optional)
* The IDE of your choice

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

# start BeuthBot
$ docker-compose up -d

# check whether the gateway is running on port 3000
$ curl http://localhost:3000          # prints: Hello from BeuthBot Gateway
```

For development you may want to start the docker containers seperatly. There are `docker-compose.yml` files in each (sub)project which can be used to start the services in serperate containers. You can simply start the `Node.js` server, too, for some projects without using docker. Note the following table which gives an overview about the ports used by the containers and about the port mapping.

When you are developing a submodule and want to push the updates you may get an error saying "HEAD detached at ...". If so, you need to checkout a brancht. Mostly the `master`.

``` shell script
$ git checkout master
```

## Default Ports

| Service | External Port | Internal Port |
| ------- | ------------: | ------------: |
| [gateway](https://github.com/beuthbot/gateway) | 3000 | 3000 |
| [deconcentrator-js](https://github.com/beuthbot/deconcentrator-js) | 8338 | 8338 |
| [rasa](https://github.com/beuthbot/rasa) | 5005 | 5005 |
| [registry](https://github.com/beuthbot/registry) | 9922 | 3000 |
| [mensa](https://github.com/beuthbot/mensa) | 9950 | 8000 |
| [weather](https://github.com/beuthbot/weather) | 9951 | 7000 |

## Packages / Submodules

| **Packagename** | **About** | **Language** |
| --------------- | --------- | :----------: |
| [gateway](https://github.com/beuthbot/gateway) | Receives messages from bot clients via a API. | JS |
| [deconcentrator-js](https://github.com/beuthbot/deconcentrator-js) | Asks multiple NLU processors for the interpretation of a given message | JS |
| [rasa](https://github.com/beuthbot/rasa) | tbd | Python |
| [registry](https://github.com/beuthbot/registry) | tbd | JS |
| [mensa](https://github.com/beuthbot/mensa) | tbd | JS |
| [weather](https://github.com/beuthbot/weather) | tbd | JS |

#### Components Model

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/components.txt)

## Technologies

#### Development

* `Docker`
* `docker-compose `
* `node` & `npm`

#### Deployment

* `Docker` (Tested with version 19.03.8)
* `docker-compose ` (Tested with version 1.25.0)

## Motivation



![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/repository.txt)

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

