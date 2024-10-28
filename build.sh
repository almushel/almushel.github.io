#! /bin/bash

if [ $1 ]; then
	dest=$1
else
	dest="./build/"
fi

if [ ! -d $dest ]; then 
	mkdir $dest
fi

rsync -ru --inplace --exclude='*.md*' ./src/* $dest
inertHTML -r -t template.html -o $dest -pagesAsDirs ./src/
