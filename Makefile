# GIT_TAG_NAME is provided by github action. we use it to know which tag (or branch) is addressed
GIT_TAG_NAME ?= master
UPDATE_TAG = $(GIT_TAG_NAME)

# Command for checking if variable exists + exit if doesnt
check_defined = \
	$(strip $(foreach 1,$1, \
		$(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
	$(if $(value $1),, \
	  $(error Undefined $1$(if $2, ($2))))

commands: $(eval .SILENT:)
	echo "targets:" && echo ""
	echo "  up               Run docker-compose"
	echo "  test             Run tests"
	echo "  update           Checkout "$$"UPDATE_TAG (default master) and pull repository with submodules"
	echo "  upgrade          Checkout every submodules current master branch"
	echo "  release          Executed (by CI/CD Pipeline) for rolling out a release-tag"
	echo "  reset            !DANGER! Will delete all unsaved changes in repo and submodules"
	echo ""

reset:
	git reset HEAD --hard
	git submodule foreach --recursive 'git reset --hard'

up:
	if ! test -f .env ; then echo "No .env file found." ; fi
	docker-compose up --build --detach

deploy:
	if ! test -f .env ; then echo "No .env file found." ; fi

# Todo: would be great to have a more sophisticated release process where update is not called at production level
release:
	$(call check_defined, BHTBOTDIR, build directory)
	echo "Trigger release in directory: $$BHTBOTDIR"
	cd $$BHTBOTDIR; \
		GIT_TAG_NAME=$(GIT_TAG_NAME) make update; \
		docker-compose -f docker-compose.yml down; \
        docker-compose -f docker-compose.yml up --build --detach; \

test:
	echo "No tests specified yet :("

upgrade:
	git submodule update --recursive --remote --merge
	git submodule foreach --recursive 'git checkout master'
	git submodule foreach --recursive 'git pull origin master'

update:
	echo "executing update for $(UPDATE_TAG)"
	git checkout $(UPDATE_TAG)
	git pull --tags
	git submodule foreach --recursive 'git checkout master'
	git submodule foreach --recursive 'git pull origin master'
	git pull --recurse-submodules
