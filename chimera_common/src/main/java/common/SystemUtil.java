package common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * Created by gleb on 03.11.2014.
 */
@Component
public final class SystemUtil {

    public static final String HOST = "chimera.host";
    public static final String SOLR = "chimera.solr.server";
    public static final String MYSQL_HOST = "chimera.mysql.host";
    public static final String PORT = "chimera.port";
    public static final String CONTEXT_PATH = "chimera.context";
    public static final String HDFS = "chimera.hdfs";
    public static final String MAPREDUCE_IN = "chimera.mapreduce.in";
    public static final String MAPREDUCE_OUT = "chimera.mapreduce.out";

    private static final SystemUtil systemUtil = new SystemUtil();

    @Autowired
    private Environment environment;

    private SystemUtil() {
    }

    public static synchronized SystemUtil getSystemUtil() {
        return systemUtil;
    }

    public String getHost() {
        return environment.getRequiredProperty(SystemUtil.HOST);
    }

    public String getSolr() {
        return environment.getRequiredProperty(SystemUtil.SOLR);
    }

    public String getMysql() {
        return environment.getRequiredProperty(SystemUtil.MYSQL_HOST);
    }

    public String getPort() {
        return environment.getRequiredProperty(SystemUtil.PORT);
    }

    public String getContextPath() {
        return environment.getRequiredProperty(SystemUtil.CONTEXT_PATH);
    }

    public String getHdfs() {
        return environment.getRequiredProperty(SystemUtil.HDFS);
    }

    public String getMapreduceIn() {
        return environment.getRequiredProperty(SystemUtil.MAPREDUCE_IN);
    }

    public String getMapreduceOut() {
        return environment.getRequiredProperty(SystemUtil.MAPREDUCE_OUT);
    }


}
