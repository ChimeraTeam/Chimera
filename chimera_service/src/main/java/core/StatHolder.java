package core;

import org.apache.log4j.Logger;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gleb on 2/10/16.
 */
public class StatHolder {

    private static final StatHolder statHolder = new StatHolder();

    private Map<String, Integer> data;

    private StatHolder() {
        this.data = new HashMap<>();
        this.data = Collections.synchronizedMap(data);
    }

    public synchronized void put(String address) {
        if (data.containsKey(address)) {
            Integer visits = data.get(address);
            data.put(address, ++visits);
        } else {
            data.put(address, 1);
        }
    }

    public Map<String, Integer> getData() {
        return data;
    }

    public static StatHolder getStatHolder() {
        return statHolder;
    }
}
