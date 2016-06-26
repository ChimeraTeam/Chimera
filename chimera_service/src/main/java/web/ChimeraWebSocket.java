package web;


import lombok.extern.slf4j.Slf4j;
import model.InputData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import service.ChimeraService;

import java.io.IOException;

/**
 * Created by gleb on 06.10.15.
 */

@Component
@Slf4j
public class ChimeraWebSocket extends TextWebSocketHandler {

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        ChimeraService chimeraService = applicationContext.getBean(ChimeraService.class);

        log.info("Get message message={}, session={}", message.getPayload(), session.getId());

        InputData inputData = chimeraService.createInputData(message.getPayload());

        String fromCache = chimeraService.checkInCache(generateCacheKey(inputData));
        if (fromCache != null) {
            session.sendMessage(new TextMessage("c" + fromCache));
            log.info("Processed from cache file={}, type={}, session={}", inputData.getFileName(), inputData.getType().name(), session.getId());
            return;
        }

        log.info("Starting processing file={}, type={}, session={}", inputData.getFileName(), inputData.getType().name(), session.getId());

        int iterator = 0;
        try {
            chimeraService.beginTransaction(generateCacheKey(inputData));
            while (chimeraService.hasData() && iterator != Integer.valueOf(inputData.getFrames())) {
                String value = chimeraService.getValue();
                if (value != null) {
                    iterator++;
                    session.sendMessage(new TextMessage(value));
                    chimeraService.putToCache(generateCacheKey(inputData), value);
                }
            }
        } catch (Exception e) {
            chimeraService.rollbackTransaction();
            log.error("Error while parsing or sending data", e);
        } finally {
            chimeraService.close();
        }

        chimeraService.commitTransaction();

        log.info("Processed successfully file={}, type={}, session={}", inputData.getFileName(), inputData.getType().name(), session.getId());
    }

    private String generateCacheKey(InputData inputData) {
        return inputData.getFileName() + "_" + inputData.getType().name() + "_" + inputData.getFrames();
    }

}