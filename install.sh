#!/bin/bash
echo "Package installer"

echo "setting package directories"
java_directory='/usr/java/'
zookeeper_directory='/usr/zk_dir/' 
kafka_directory='/usr/Kafka_dir/'
sbt_directory=''

#install pip

( apt install python3-pip )
sleep 10
( -H pip install --upgrade pip )

echo "Installing java"

if [ ! -d $JAVA_HOME ]
 then
  mkdir -p -v $java_directory
 echo "java directory created --> /usr/java/"

#copy the java installation file to the newly created folder
 cp -r jdk-8u144-linux-x64.tar.gz $java_directory

#start installing java
 tar xvzf jdk-8u144-linux-x64.tar.gz -C $java_directory
 sleep 10

#set environmental variable for JAVA_HOME
 if ! grep -Fx "export JAVA_HOME=/usr/java/jdk1.8.0_144" /etc/profile
  then
   echo "export JAVA_HOME=/usr/java/jdk1.8.0_144" >> /etc/profile
   echo "PATH=$PATH:$HOME/bin:$JAVA_HOME/bin" >> /etc/profile
   echo "export PATH" >> /etc/profile
 fi

 ( update-alternatives --install "/usr/bin/java" "java" "/usr/java/jdk1.8.0_144/bin/java" 1 )
 ( update-alternatives --install "/usr/bin/javac" "javac" "/usr/java/jdk1.8.0_144/bin/javac" 1 )
 ( update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/java/jdk1.8.0_144/bin/javaws" 1 )
 
else 
 echo "java already exists"
fi

echo "Installing Zookeeper"

if [ ! -d $zookeeper_directory ]
 then
  mkdir -p -v $zookeeper_directory
 echo "zookeeper_directory directory created --> /mnt/c/Users/Parabole/zk_dir/"


#copy the zookeeper installation file to the newly created folder
 cp -r zookeeper-3.5.2-alpha.tar.gz $zookeeper_directory
 tar xvzf zookeeper-3.5.2-alpha.tar.gz -C $zookeeper_directory

 sleep 15
 mv $zookeeper_directory/zookeeper-3.5.2-alpha/conf/zoo_sample.cfg $zookeeper_directory/zookeeper-3.5.2-alpha/conf/zoo.cfg

 if ! grep -Fx "export ZOOKEEPER_INSTALL=/usr/zk_dir/zookeeper-3.5.2-alpha" /etc/profile
  then
   echo "export ZOOKEEPER_INSTALL=/usr/zk_dir/zookeeper-3.5.2-alpha" >> /etc/profile
 fi
  
else
 echo "Zookeeper already exists"
fi


echo "Installing kafka"

if [ ! -d $kafka_directory ]
 then
  mkdir -p -v $kafka_directory
 echo "kafka_directory directory created --> /usr/Kafka_dir"

 cp -r kafka_2.11-0.11.0.1.tgz $kafka_directory
 tar xvzf kafka_2.11-0.11.0.1.tgz -C $kafka_directory

 sleep 15

 if ! grep -Fx "export KAFKA_HOME=/usr/Kafka_dir/kafka_2.11-0.11.0.1" /etc/profile
  then
   echo "export KAFKA_HOME=/usr/Kafka_dir/kafka_2.11-0.11.0.1" >> /etc/profile
 fi

else 
 echo "kafka already exists"
fi


echo "Installing python modules"

pip3 install python_modules/numpy-1.13.3.zip
#echo "numpy installed successfully"
sleep 5

pip3 install python_modules/scipy-1.0.0rc1.tar.gz
#echo "scipy installed successfully"
sleep 5

pip3 install python_modules/scikit-learn-0.18.1.tar.gz
#echo "scikit-learn installed successfully"
sleep 5

pip3 install python_modules/nltk-3.2.5.tar.gz
#echo "nltk installed successfully"
sleep 5

pip3 install python_modules/gensim-3.0.1.tar.gz
#echo "gensim installed successfully"
sleep 5

pip3 install python_modules/beautifulsoup4-4.6.0.tar.gz
#echo "Beautiful Soup installed successfully"
sleep 5

echo "Packages and dependency installation Done"
