$TOMCAT_HOME/bin/shutdown.sh

cd ..
mvn clean
mvn install -DskipTests

rm -rf $TOMCAT_HOME/webapps/chimera_*
cp chimera_web/target/chimera_web.war chimera_service/target/chimera_service.war $TOMCAT_HOME/webapps

yes | cp -i chimera_processing/lib/xz-1.0.jar $TOMCAT_HOME/lib
yes | cp -i chimera_service/src/main/webapp/WEB-INF/classes/log4j.properties $TOMCAT_HOME/lib
 
$TOMCAT_HOME/bin/startup.sh




