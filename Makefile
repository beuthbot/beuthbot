
commands: $(eval .SILENT:)
	echo "targets:" && echo ""
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

# Command for checking if variable exists + exit if doesnt
check_defined = \
	$(strip $(foreach 1,$1, \
		$(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
	$(if $(value $1),, \
	  $(error Undefined $1$(if $2, ($2))))

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
	$(call check_defined, BHTBOTDIR, build directory)
	echo "Trigger release in directory: $$BHTBOTDIR"
	cd $$BHTBOTDIR; \
	  if ! test -f .env ; then echo "No .env file found."; exit 1 ; fi; \
	  docker-compose -f docker-compose.production.yml down; \
	  docker-compose -f docker-compose.production.yml up --build --detach

update:
	git pull --recurse-submodules
	git submodule init
	git submodule update
	git checkout master
	git submodule foreach --recursive 'git checkout master'
	git submodule foreach --recursive 'git pull'
