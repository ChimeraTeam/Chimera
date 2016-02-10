package core;

import org.apache.log4j.Logger;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by gleb on 2/10/16.
 */
public class StatHolder {

    private Logger logger = Logger.getLogger(StatHolder.class);
    private static final StatHolder statHolder = new StatHolder();

    private Map<String, Integer> data;

    private StatHolder() {
        this.data = new HashMap<>();
        this.data = Collections.synchronizedMap(data);
    }

    public synchronized void put(String address) {
        if (data.containsKey(address)) {
            Integer integer = data.get(address);
            integer++;
            data.put(address, integer);
            logger.info("incrementing ... " + address);
        } else {
            logger.info("putting ... " + address);
            data.put(address, 1);
        }
    }


    public static StatHolder getStatHolder() {
        return statHolder;
    }
}
