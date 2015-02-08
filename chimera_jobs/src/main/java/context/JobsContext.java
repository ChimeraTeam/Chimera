package context;

import common.ChimeraContext;
import jobs.impl.FileCheckerJob;
import jobs.interfaces.IJob;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tasks.impl.CheckFilesTask;
import tasks.interfaces.ITask;



/**
 * Created by gleb on 07.02.15.
 */
@Configuration
@EnableAutoConfiguration
public class JobsContext extends ChimeraContext  {

    @Bean
    public ITask checkFilesTask() {
        return new CheckFilesTask();
    }

    @Bean
    public IJob fileCheckerJob(){
        return new FileCheckerJob();
    }

}
