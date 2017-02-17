package service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

import java.util.Optional;

import static java.util.Objects.requireNonNull;
import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

/**
 * Created by gleb on 5/21/16.
 */
@Component
@Slf4j
public class CacheManager {

    private Jedis client;
    private Transaction transaction;

    public CacheManager(String host) {
        this.client = new Jedis(host);
        connectToRedis();
    }

    private void connectToRedis() {
        try {
            this.client.connect();
        } catch (RuntimeException e) {
            log.warn("Can't connect to Redis ", e);
        }
    }

    public void put(String fileName, String text) {
        if (client.isConnected()) {
            transaction.append(fileName, text);
        }
    }

    public Optional<String> get(String fileName) {
        return client.isConnected() ? ofNullable(client.get(fileName)) : empty();
    }

    public void beginTransaction(String key) {
        if (client.isConnected()) {
            client.watch(key);
            transaction = client.multi();
        }
    }

    public void commitTransaction() {
        if (client.isConnected()) {
            requireNonNull(transaction);
            transaction.exec();
        }
    }

    public void rollbackTransaction() {
        if (client.isConnected()) {
            requireNonNull(transaction);
            transaction.discard();
        }
    }

}
