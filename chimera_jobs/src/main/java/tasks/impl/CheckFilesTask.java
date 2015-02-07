package tasks.impl;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileChecksum;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.stereotype.Component;
import tasks.interfaces.ITask;


/**
 * Created by gleb on 07.02.15.
 */
@Component
public class CheckFilesTask implements ITask {

    @Override
    public void doTask() {
        try {
            Path path = new Path("/home/gleb/trajectory");

            Configuration configuration = new Configuration();
            FileSystem fileSystem = FileSystem.get(configuration);
            FileChecksum fileChecksum = fileSystem.getFileChecksum(path);
            System.out.println(new String(fileChecksum.getBytes()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
