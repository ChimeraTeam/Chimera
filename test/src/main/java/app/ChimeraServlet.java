package app;

import org.gridgain.grid.GridException;
import org.gridgain.grid.util.typedef.G;
import org.gridgain.grid.util.typedef.X;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Properties;

/**
 * Created by Gleb on 02.05.14.
 */
@WebServlet(urlPatterns = "/home", name = "SimpleServlet")
public class ChimeraServlet extends HttpServlet {

    private String homeDir;
    private String targetDir;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        resp.setContentType("text/html");
        String file_name = req.getParameter("filename");
        String type = req.getParameter("type");
        Properties property = new Properties();
        property.load(getServletConfig().getServletContext().getResourceAsStream("/WEB-INF/config.properties"));
        homeDir = property.getProperty("home_dir");
        targetDir = property.getProperty("target_dir");
        if (file_name == null) {
            createPage(writer);
            return;
        }
        FileInputStream in = new FileInputStream(homeDir + file_name);
        FileCreator creator = new FileCreator(type, in, targetDir);
        File file = null;
        FileSplitter fileSplitter = null;
        try {
            fileSplitter = new FileSplitter(new File(homeDir + file_name), 2);
        } catch (Exception e) {
            e.printStackTrace();
        }
        File[] fls = fileSplitter.split();
        try {
            //       file = creator.createFile();
            G.start("D:\\gridgain-platform-os-6.1.8-win\\examples\\config\\example-compute.xml");
            List<File> files = mapReduce(fls);
            X.println("Files " + files);
            for (int i = 0; i < fls.length; i++) {
                fls[i].delete();
            }
            G.stop(true);
        } catch (Exception ex) {
            ex.printStackTrace();
            resp.sendRedirect("/error.html");
            return;
        }
        if (file == null) {
            resp.sendRedirect("/404.html");
            return;
        }
        resp.sendRedirect("/visualization.html");
        writer.close();
    }

    public static List<File> mapReduce(File files[]) throws GridException {
        return G.grid().compute().apply(new Compute(), Arrays.asList(files), new Reduce()).get();
    }

    private void createPage(PrintWriter writer) {
        writer.println("<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<style>\n" +
                "table,th,td\n" +
                "{\n" +
                "border:1px solid black;\n" +
                "border-collapse:collapse;\n" +
                "}\n" +
                "th,td\n" +
                "{\n" +
                "padding:5px;\n" +
                "}\n" +
                "th\n" +
                "{\n" +
                "text-align:left;\n" +
                "}\n" +
                "</style>\n" +
                "</head>\n" +
                "<body>");
        File[] files = new File(homeDir).listFiles();
        writer.println("<table style=\"width:600px\">");
        writer.println("<tr>\n" +
                "  <th>Filename</th>\n" +
                "  <th>Size, mb</th> \n" +
                "  <th>Last modified</th>\n" +
                "</tr>");
        for (int i = 0; i < files.length; i++) {
            writer.println("<tr>\n" +
                    "  <td>" + files[i].getName() + "</td>\n" +
                    "  <td>" + (files[i].length() / (1024 * 1024)) + "</td> \n" +
                    "  <td>" + new Date(files[i].lastModified()) + "</td>\n" +
                    "</tr>");
        }
        writer.println("</table>");
        writer.println("\n" +
                "</body>\n" +
                "</html>");
        writer.close();
    }
}
