package common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * Created by gleb on 03.11.2014.
 */
@Component
public final class SystemUtil {

    public static final String SERVICE_HOST = "chimera.service.host";
    public static final String SERVICE_PORT = "chimera.service.port";
    public static final String SERVICE_CONTEXT = "chimera.service.context";
    public static final String SERVICE_VISUALIZER = "chimera.service.visualizer";

    private static final SystemUtil systemUtil = new SystemUtil();

    @Autowired
    private Environment environment;

    private SystemUtil() {
    }

    public static synchronized SystemUtil getSystemUtil() {
        return systemUtil;
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


}
