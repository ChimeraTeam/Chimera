package service;

import core.StatHolder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

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
        PrintWriter writer = resp.getWriter();
        writer.write(statHolder.getData().toString());
        writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        statHolder.put(req.getRemoteAddr());
    }
}
