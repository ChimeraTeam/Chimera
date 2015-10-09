package tasks.impl;

import common.SystemUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tasks.interfaces.ITask;


/**
 * Created by gleb on 07.02.15.
 */
@Component
public class CheckFilesTask implements ITask {


    @Autowired
    private SystemUtil systemUtil;

    @Override
    public void doTask() {
        try {

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
