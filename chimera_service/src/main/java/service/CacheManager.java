package service;

import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;

/**
 * Created by gleb on 5/21/16.
 */
@Component
public class CacheManager {

    private Jedis client;

    public CacheManager(String host) {
        this.client = new Jedis(host);
    }

    public void put(String fileName, String text) {
        client.append(fileName, text);
    }

    public String get(String fileName) {
        return client.get(fileName);
    }

}
