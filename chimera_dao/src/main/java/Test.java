import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by gleb on 02.11.2014.
 */

public class Test {

    public static void main(String[] args) throws Exception {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SolrContext.class);
        ProductService bean = context.getBean(ProductService.class);
        bean.doSomething();

//        ClassPathXmlApplicationContext xmlApplicationContext = new ClassPathXmlApplicationContext("application-context.xml");
//        ProductService productService = xmlApplicationContext.getBean(ProductService.class);
//        productService.doSomething();
    }


}
