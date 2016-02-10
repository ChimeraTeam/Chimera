package service;

import core.StatHolder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by gleb on 2/10/16.
 */
@WebServlet("/stat")
public class StatServlet extends HttpServlet {

    private StatHolder statHolder;

    @Override
    public void init() {
        this.statHolder = StatHolder.getStatHolder();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("data", statHolder.getData());
        req.getRequestDispatcher("jsp/stat.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        statHolder.put(req.getRemoteAddr());
    }
}
