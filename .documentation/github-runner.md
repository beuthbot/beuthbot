## Documentation of self-hosted github-runner setup for production VM

### Resources / Readings
* https://github.com/actions/runner
* https://docs.github.com/en/free-pro-team@latest/actions/hosting-your-own-runners

### Directory
The target install directory in production is `/usr/local/share/beuthbot/github-runner`

The runner will execute it's tasks inside this directory

### User
The runner is controlled by an extra user `githubrunner` who is part of the user-groups `docker` and `beuthbot`

### Environment
The runner specifies environment variables in <RUNNERDIR>/.env for usage while running workflows:
```dotenv
# directory used for release-deployment
BHTBOTDIR=/usr/local/share/beuthbot/beuthbot/
```

### Service
The runner is registered as a service within the operating system. This was done by using the official commands
```shell script

# setup:
sudo chown -R githubrunner:beuthbot ../github-runner/
sudo ./svc.sh install githubrunner

# start
sudo ./svc.sh start

# status
sudo ./svc.sh status

# stop
sudo ./svc.sh stop
```
Important: The install command uses the runner-username as parameter. Without this parameter it would be bound to the executing user.
