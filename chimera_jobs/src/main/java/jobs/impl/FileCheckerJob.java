package jobs.impl;


import context.JobsContext;
import jobs.interfaces.IJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import tasks.interfaces.ITask;

/**
 * Created by gleb on 07.02.15.
 */
@EnableScheduling
@Import(JobsContext.class)
public class FileCheckerJob implements IJob {

    @Autowired
    private ITask task;


    @Scheduled(cron = "0 0 */6 * * *")  // every 6 hours
    public void exec() {
        task.doTask();
    }

}
