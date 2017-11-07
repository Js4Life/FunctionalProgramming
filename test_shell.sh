#!/bin/bash

echo "The current directory"
( pwd )
base_path=`pwd`
corpus_builder_path='/mnt/c/Sandbox/Workspace/Parabole/parabole-play-corpus-builder'
cd $corpus_builder_path

( java -jar /mnt/c/Program\ Files\ \(x86\)/sbt/bin/sbt-launch.jar "run 8000" </dev/null & )

#cd $base_path
