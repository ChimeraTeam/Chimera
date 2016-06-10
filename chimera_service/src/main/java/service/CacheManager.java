package service;

import redis.clients.jedis.Jedis;

/**
 * Created by gleb on 5/21/16.
 */
public final class CacheManager {

    private static Jedis client = new Jedis("localhost");

    private CacheManager() {
    }

    private static CacheManager cacheManager = new CacheManager();

    public void put(String fileName, String text) {
        client.append(fileName, text);
    }

    public String get(String fileName) {
        return client.get(fileName);
    }

    public synchronized static CacheManager getCacheManager() {
        return cacheManager;
    }

}
