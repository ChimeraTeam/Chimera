import common.SystemUtil;
import dtos.ChimeraDTO;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import services.SolrService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * Created by gleb on 31.01.2015.
 */
public class Launcher {
    public static void main(String[] args) throws Exception {

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SolrContext.class);

        SystemUtil config = context.getBean(SystemUtil.class);

        Server server = new Server();

        ServerConnector httpConnector = new ServerConnector(server);
        httpConnector.setPort(Integer.valueOf(config.getPort()));
        server.addConnector(httpConnector);

        ServletContextHandler contextHandler = new ServletContextHandler();
        contextHandler.setContextPath(config.getContextPath());

        contextHandler.addServlet(new ServletHolder(new SimpleServlet()), "/");
        server.setHandler(contextHandler);

        server.start();
    }

}

class SimpleServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(DAOApplicationContext.class);
        SolrService bean = context.getBean(SolrService.class);
        bean.deleteAllStates();
        bean.saveState(new ChimeraDTO("from web"));
    }


}