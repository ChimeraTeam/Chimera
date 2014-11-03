package app;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

/**
 * Created by Gleb on 22.06.14.
 */
public class Writer {
    private static final List<Worker> list = Collections.synchronizedList(new ArrayList<Worker>());
    private static final Queue<Worker> threadQueue = new LinkedList<>();
    private static BufferedWriter bufferedWriter;

    static {
        try {
            bufferedWriter = new BufferedWriter(new FileWriter("phase"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void register(Worker thread) throws IOException {
        threadQueue.add(thread);
        for (int i = 0; i < threadQueue.size(); i++) {
            list.add(threadQueue.poll());
        }
        write();
    }

    public static void write() throws IOException {
        Collections.sort(list, new Comparator<Worker>() {
            @Override
            public int compare(Worker o1, Worker o2) {
                if (o1.getId() > o2.getId()) {
                    return 1;
                }
                if (o1.getId() < o2.getId()) {
                    return -1;
                }
                return 0;
            }
        });
        for (int i = 0; i < list.size(); i++) {
            bufferedWriter.write(list.get(i).getString());
        }
    }

}
