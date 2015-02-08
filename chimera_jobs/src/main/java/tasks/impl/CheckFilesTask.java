package tasks.impl;

import common.SystemUtil;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.FileUtil;
import org.apache.hadoop.fs.Path;
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

            systemUtil = SystemUtil.getSystemUtil();
            Configuration configuration = new Configuration();
            configuration.set("fs.defaultFS", systemUtil.getHdfs());

            Path in = new Path(systemUtil.getMapreduceIn());

            FileSystem fileSystem = FileSystem.get(configuration);

            FileStatus[] fileStatuses = fileSystem.listStatus(in);

            Path[] paths = FileUtil.stat2Paths(fileStatuses);

            for (Path path : paths) {
                System.out.println(path + " " + new String(fileSystem.getFileChecksum(path).getBytes()));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
