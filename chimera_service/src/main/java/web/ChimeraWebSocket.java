package web;


import model.InputData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
public class ChimeraWebSocket extends TextWebSocketHandler {

    private Logger logger = LoggerFactory.getLogger(ChimeraWebSocket.class);

    @Autowired
    private ChimeraService chimeraService;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        logger.info("Get message message={} session={}", message.getPayload(), session.getId());

        new Thread(() -> {

            InputData inputData = chimeraService.createInputData(message.getPayload());

            String result = chimeraService.checkInCache(generateCacheKey(inputData));
            if (result != null) {
                try {
                    session.sendMessage(new TextMessage("c" + result));
                } catch (IOException e) {
                    logger.error(e.getMessage());
                }
                return;
            }

            logger.info("Starting processing file={} type={} session={}",
                    new String[]{inputData.getFileName(), inputData.getType().name(), session.getId()});


            while (chimeraService.hasNext()) {
                String value = chimeraService.next();
                if (value != null) {
                    try {
                        if (!session.isOpen()) return;
                        session.sendMessage(new TextMessage(value));
                    } catch (IOException e) {
                        logger.error(e.getMessage());
                    }
                    chimeraService.putInCache(generateCacheKey(inputData), value);
                }
            }

            logger.info("Processed successfully file={} type={} session={}",
                    new String[]{inputData.getFileName(), inputData.getType().name(), session.getId()});
        }).start();
    }

    private String generateCacheKey(InputData inputData) {
        return inputData.getFileName() + "_" + inputData.getType().name() + "_" + inputData.getFrames();
    }

}
