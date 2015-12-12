cd $PROJECT_HOME
git pull

mvn clean
mvn install -DskipTests

$TOMCAT_HOME/bin/shutdown.sh

rm -rf $TOMCAT_HOME/webapps/chimera_*
cp chimera_web/target/chimera_web.war chimera_service/target/chimera_service.war $TOMCAT_HOME/webapps

yes | cp -i chimera_processing/lib/xz-1.0.jar $TOMCAT_HOME/lib

$TOMCAT_HOME/bin/startup.sh