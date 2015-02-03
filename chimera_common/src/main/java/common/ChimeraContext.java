package common;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Created by gleb on 31.01.2015.
 */
public class ChimeraContext {

    private ChimeraContext() {
    }

    private static volatile AnnotationConfigApplicationContext context;

    public static synchronized AnnotationConfigApplicationContext getAnnotationConfigApplicationContext() {
        if (context == null) {
            context = new AnnotationConfigApplicationContext();
        }
        return context;
    }
}
