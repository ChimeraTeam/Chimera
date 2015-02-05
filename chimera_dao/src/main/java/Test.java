import dtos.ChimeraDTO;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import services.SolrService;

/**
 * Created by gleb on 05.02.15.
 */
public class Test {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(DAOApplicationContext.class);
        SolrService bean = context.getBean(SolrService.class);
        bean.saveState(new ChimeraDTO("new"));
    }
}
