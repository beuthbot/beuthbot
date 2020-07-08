
commands: $(eval .SILENT:)
	echo "commands:" && echo ""
	echo "  pull             git pull --recurse-submodules"
	echo "  reset            git reset HEAD --hard"
	echo "                   git submodule foreach --recursive 'git reset --hard'"
	echo ""

pull:
	git pull --recurse-submodules

reset:
	git reset HEAD --hard
	git submodule foreach --recursive 'git reset --hard'

up:
	if ! test -f .env ; then echo "No .env file found." ; fi
	docker-compose up --build --detach

deploy:
	if ! test -f .env ; then echo "No .env file found." ; fi
	docker-compose -f docker-compose.production.yml down
	docker-compose -f docker-compose.production.yml up --build --detach

