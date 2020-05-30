# BeuthBot

![Icon](.documentation/BeuthBotIcon100.png "Icon")

> Ein enorm intelligenter, messenger-unabhängiger Chatbot.

## Installation

```shell script

// clone project
$ git clone https://github.com/beuthbot/beuthbot.git

// or with ssh
$ git clone git@github.com:beuthbot/beuthbot.git

// change into directory
$ cd beuthbot

// initialize submodules
$ git submodule init

// clone all submodules
$ git submodule update

// start BeuthBot
$ docker-compose up -d

// check whether the gateway is running on port 3000
$ curl http://localhost:3000          # Hello from BeuthBot Gateway
```

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

## Components Model

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/beuthbot/master/.documentation/uml/components.txt)

## Bot Clients

* [telegram-bot](https://github.com/beuthbot/telegram-bot)
