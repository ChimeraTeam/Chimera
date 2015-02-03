import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Created by gleb on 02.11.2014.
 */

public class Test {

    public static void main(String[] args) throws Exception {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext();

        context.register(SolrContext.class);

        context.refresh();

        ServiceG bean = context.getBean(ServiceG.class);
        bean.test();
    }


}
