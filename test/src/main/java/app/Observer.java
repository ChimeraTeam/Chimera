package app;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * Created by Gleb on 22.06.14.
 */
public class Observer implements Runnable {
    private ArrayList<Thread> threads;

    public Observer(ArrayList<Thread> threads) {
        this.threads = threads;
    }

    @Override
    public void run() {
        long start = System.currentTimeMillis();
        Iterator<Thread> iterator = threads.iterator();
        while (!threads.isEmpty()) {
            for (int i = 0; i < threads.size(); i++) {
                if (!threads.get(i).isAlive()) {
                    threads.remove(i);
                }
            }
        }
        long finish = System.currentTimeMillis();
        System.out.println(finish - start);
    }

}
