
commands: $(eval .SILENT:)
	echo "commands:" && echo ""
	echo "  pull             git pull --recurse-submodules"
	echo "  reset            git reset HEAD --hard"
	echo "                   git submodule foreach --recursive 'git reset --hard'"
	echo "  update           pull"
	echo "                   git submodules init"
	echo "                   git submodules update"
	echo "                   checkout-master"
	echo "  checkout-master  git checkout master"
	echo "                   git submodule foreach --recursive 'git checkout master'"
	echo "                   git submodule foreach --recursive 'git pull'"
	echo "  up               docker-compose up --build --detach"
	echo "  deploy           docker-compose -f docker-compose.production.yml down"
	echo "                   docker-compose -f docker-compose.production.yml up --build --detach"
	echo ""

update:
	pull
	git submodules init
	git submodules update
	checkout-master

pull:
	git pull --recurse-submodules

reset:
	git reset HEAD --hard
	git submodule foreach --recursive 'git reset --hard'

checkout-master:
	git checkout master
	git submodule foreach --recursive 'git checkout master'
	git submodule foreach --recursive 'git pull'

up:
	if ! test -f .env ; then echo "No .env file found." ; fi
	docker-compose up --build --detach

deploy:
	if ! test -f .env ; then echo "No .env file found." ; fi
	docker-compose -f docker-compose.production.yml down
	docker-compose -f docker-compose.production.yml up --build --detach
