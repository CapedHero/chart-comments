#!/usr/bin/env bash

set -e          # Exit immediately if a command returns a non-zero status.
set -o pipefail # If any command in a pipeline fails, its return code will be
                # used as the return code of the whole pipeline.
set -u          # Exit immediately if a variable is undefined.
set -x          # Print each command.

prettier --write . \
  && eslint . --ext .js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore
