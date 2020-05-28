#BeuthBot

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

<uml>
@startuml

rectangle "Telegram Bot" as TGB 
rectangle "Gateway" as GW
rectangle "DeconcentratorJS" as DC
rectangle "Registry" as R



package "NLU" {
rectangle "Rasa" as RA
}

package "Services" {
rectangle "Wetterservice" as W
rectangle "Mensaservice" as M
}

TGB -down-> GW
GW -up-> TGB
GW -down-> DC : Request
DC -up-> GW : Intent with Data
DC -right-> RA
RA -left-> DC
GW -right-> R : Intent Request with Data + User
R -left-> GW : Answer From Service
R -right-> M
R -right-> W

@enduml
</uml>
