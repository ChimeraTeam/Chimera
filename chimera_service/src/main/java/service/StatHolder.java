package service;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gleb on 2/10/16.
 */
@Component
public class StatHolder {

    private Map<String, Integer> data;

    private StatHolder() {
        this.data = Collections.synchronizedMap(new HashMap<>());
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
}
