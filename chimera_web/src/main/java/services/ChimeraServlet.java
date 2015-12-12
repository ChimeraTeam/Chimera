package services;

import common.ChimeraContext;
import common.SystemUtil;
import model.ChimeraFile;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import service.ChimeraReader;

import javax.annotation.PostConstruct;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by gleb on 06.10.15.
 */
@WebServlet(value = "/visualization", loadOnStartup = 1)
public class ChimeraServlet extends HttpServlet {

    private Logger logger = Logger.getLogger(ChimeraServlet.class);

    private List<ChimeraFile> files;
    private static final String CONTENT_PATH = "content/content.jsp";
    private static String VISUALIZATION_PATH;
    private static String SERVICE_HOST;
    private boolean isProcessedFiles;

    @PostConstruct
    public void init() {
        logger.info("Starting ... ");

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ChimeraContext.class);
        SystemUtil config = context.getBean(SystemUtil.class);

        VISUALIZATION_PATH = config.getServiceContextVisualizer();
        SERVICE_HOST = config.getServiceHost();
        SERVICE_HOST += config.getServiceContextPath();

        processFiles(config.getInput());
    }

    private void processFiles(String input) {
        if (!isProcessedFiles) {
            SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
            int filesLeft;
            File[] files = new File(input).listFiles();
            List<ChimeraFile> chimeraFiles = new ArrayList<>();
            if (files != null) {
                filesLeft = files.length;
                logger.info("Files to be checked " + files.length);
                for (File file : files) {
                    if (file.getName().endsWith(".xz")) {
                        logger.info("Starting file " + file.getAbsolutePath());
                        ChimeraReader reader = new ChimeraReader(file.getAbsolutePath());
                        ChimeraFile chimeraFile = new ChimeraFile();
                        chimeraFile.setName(file.getName());
                        int lineCount = getLineCount(reader);
                        chimeraFile.setLineCount(lineCount);
                        chimeraFile.setAbsoluteName(file.getAbsolutePath());
                        chimeraFile.setLastUpdate(formatter.format(file.lastModified()));
                        chimeraFile.setSize(file.length() / (1024 * 1024));
                        chimeraFiles.add(chimeraFile);
                        filesLeft--;
                        logger.info("Finished file " + file.getAbsolutePath() + " lines " + lineCount + " left " + filesLeft);
                    }
                }
            }
            logger.info("Finished all files");
            this.files = chimeraFiles;
        }
        this.isProcessedFiles = true;
    }

    private int getLineCount(ChimeraReader reader) {
        int count = 0;
        while (reader.hasNext()) {
            reader.next();
            count++;
        }
        return count;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("files", files);
        RequestDispatcher requestDispatcher = req.getRequestDispatcher(CONTENT_PATH);
        requestDispatcher.forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String file = req.getParameter("file");
        if (file != null) {
            String fileName = file.split("_")[0];
            String type = file.split("_")[1];
            String frames = file.split("_")[2];
            req.setAttribute("fileName", fileName);
            req.setAttribute("type", type);
            req.setAttribute("frames", frames);
            String params = VISUALIZATION_PATH + "?" + "type=" + type + "&fileName=" + fileName + "&frames=" + frames;
            resp.sendRedirect(SERVICE_HOST + params);
        }
    }
}
