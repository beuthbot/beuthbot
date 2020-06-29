
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
