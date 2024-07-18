#!/bin/sh
# This script outputs a git log for a specified file in yaml format
# Usage: gaml.sh <file>

if [ -z "$1" ]; then
  echo "Usage: $0 <file>"
  exit 1
fi

git \
  --no-pager log \
  --pretty=format:"  - id: %h%n    author: '%an'%n    timestamp: '%at'%n    message: '%f'" \
  --follow -- "$1"
