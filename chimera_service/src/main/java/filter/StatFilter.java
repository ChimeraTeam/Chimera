package filter;

import core.StatHolder;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * Created by gleb on 2/10/16.
 */
@WebFilter
public class StatFilter implements Filter {

    private StatHolder statHolder;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        statHolder = StatHolder.getStatHolder();
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String remoteAddr = servletRequest.getRemoteAddr();
        statHolder.put(remoteAddr);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
