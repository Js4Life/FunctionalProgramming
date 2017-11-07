#!/bin/bash

base_path=`pwd`
corpus_builder_path='/usr/parabole-play-corpus-builder'
cp -r parabole-play-corpus-builder $corpus_builder_path

zk_path='/usr/zk_dir/zookeeper-3.5.2-alpha'
cp -r zookeeper-3.5.2-alpha $zk_path

kafka_path='/usr/Kafka_dir/kafka_2.11-0.11.0.1'
cp -r kafka_2.11-0.11.0.1 $kafka_path

orientdb_path='/usr'
cp -r orientdb $orientdb_path

#ml_pack_path='/mnt/c/Users/Parabole/Downloads/packages/parabole-ml-pack'
#fuseki_server='/mnt/c/Users/Parabole/Downloads/packages/apache-jena-fuseki-3.4.0'

automover='/usr'
cp -r automover_python $automover

#start zookeeper
( $zk_path/bin/zkServer.sh start & )
sleep 7
#erase all the previous logs
rm -rf $kafka_path/logs/\*
rm -rf /usr/Kafka_dir/kafka_2.11-0.11.0.1/kafka-logs
#start kafka-server
( sh $kafka_path/bin/kafka-server-start.sh $kafka_path/config/server.properties > $kafka_path/kafka-logs.log & )
sleep 7

#start orient-db
( $orientdb_path/bin/server.sh & )
sleep 7

cd $corpus_builder_path

( java -jar /usr/bin/sbt/bin/sbt-launch.jar "run 8000" )
sleep 30

( xdg-open 'http://localhost:8000/' )

cd $base_path

( python3 $automover/move_files.py & )

#start fuseki
#( java -jar $fuseki_server/fuseki-server.jar & )
