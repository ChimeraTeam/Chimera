package common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * Created by gleb on 03.11.2014.
 */
@Component
public final class SystemUtil {

    public static final String WEB_HOST = "chimera.web.host";
    public static final String WEB_PORT = "chimera.web.port";
    public static final String WEB_CONTEXT = "chimera.web.context";

    @Deprecated
    public static final String SOLR = "chimera.solr";

    public static final String SERVICE_HOST = "chimera.service.host";
    public static final String SERVICE_PORT = "chimera.service.port";
    public static final String SERVICE_CONTEXT = "chimera.service.context";
    public static final String SERVICE_VISUALIZER = "chimera.service.visualizer";

    public static final String INPUT = "chimera.input";

    private static final SystemUtil systemUtil = new SystemUtil();

    @Autowired
    private Environment environment;

    private SystemUtil() {
    }

    public static synchronized SystemUtil getSystemUtil() {
        return systemUtil;
    }

    public String getWebHost() {
        return environment.getRequiredProperty(SystemUtil.WEB_HOST);
    }

    public String getSolr() {
        return environment.getRequiredProperty(SystemUtil.SOLR);
    }

    public String getWebPort() {
        return environment.getRequiredProperty(SystemUtil.WEB_PORT);
    }

    public String getWebContextPath() {
        return environment.getRequiredProperty(SystemUtil.WEB_CONTEXT);
    }

    public String getServiceHost() {
        return environment.getRequiredProperty(SystemUtil.SERVICE_HOST);
    }

    public String getServicePort() {
        return environment.getRequiredProperty(SystemUtil.SERVICE_PORT);
    }

    public String getServiceContextPath() {
        return environment.getRequiredProperty(SystemUtil.SERVICE_CONTEXT);
    }

    public String getServiceContextVisualizer() {
        return environment.getRequiredProperty(SystemUtil.SERVICE_VISUALIZER);
    }

    public String getInput() {
        return environment.getRequiredProperty(SystemUtil.INPUT);
    }


}
