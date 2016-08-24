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
        data.computeIfPresent(address, (s, visits) -> ++visits);
        data.computeIfAbsent(address, s -> 1);
    }

    public Map<String, Integer> getData() {
        return data;
    }
}
