#BeuthBot

![Icon](.documentation/BeuthBotIcon.png =100x100 "Icon")

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


