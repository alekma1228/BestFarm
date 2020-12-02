#!/bin/bash
echo "Checking for package-lock.json"
if test -f "package-lock.json"; then
  echo "package-lock.json exists"
  echo "Please remove package-lock.json, delete your node_modules directory, and reinstall node"
  echo "modules using yarn instead of npm"
  exit 1
fi

echo "Checking for uncommited files"
git diff-index --quiet HEAD --
RESULT=$?
if [ $RESULT != 0 ]; then
  echo "ERROR:"
  echo "There are unsaved changes"
  echo "Commit changed files or revert them"
  exit 1
fi

echo "Ensuring packages in node_modules are up to date"
yarn check --integrity
RESULT=$?
if [ $RESULT != 0 ]; then
  echo "ERROR:"
  echo "Your node_modules folder is not up to date"
  echo "Run yarn install"
  exit 1
fi

echo "Running TSC"
yarn tsc
RESULT=$?
if [ $RESULT != 0 ]; then
  echo "ERROR:"
  echo "Typescript compiler encountered an error"
  exit 1
fi

echo "Running yarn lint"
yarn lint
RESULT=$?
if [ $RESULT != 0 ]; then
  echo "ERROR:"
  echo "TSLINT encountered errors"
  exit 1
fi

echo "pre-push hook: SUCCESS"
exit 0
