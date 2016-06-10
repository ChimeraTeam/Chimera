package web;


import constants.Compress;
import constants.Types;
import model.InputData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import service.ChimeraService;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by gleb on 06.10.15.
 */

@Component
@ServerEndpoint("/chimera_service/websocket")
public class ChimeraWebSocket {

    private Logger logger = LoggerFactory.getLogger(ChimeraWebSocket.class);

    private static final String[] OSCILLATIONS_100 = {"100x100x100", "8"};
    private static final String[] OSCILLATIONS_200 = {"200x200x200", "64"};
    private static final String[] OSCILLATIONS_400 = {"400x400x400", "512"};
    private ChimeraService chimeraService = new ChimeraService();

    @OnMessage
    public void onMessage(String data, Session session) {
        logger.info("Get message message={} session={}", data, session.getId());

        new Thread(() -> {

            InputData inputData = createInputData(data);
            chimeraService.init(inputData);

            logger.info("Starting processing file={} type={} session={}",
                    new String[]{inputData.getFileName(), inputData.getType().name(), session.getId()});


            String result = chimeraService.checkInCache(inputData.getFileName());
            if (result != null) {
                session.getAsyncRemote().sendText("c" + result);
                return;
            }

            while (chimeraService.hasNext()) {
                String value = chimeraService.next();
                if (value != null) {
                    if (!session.isOpen()) return;
                    session.getAsyncRemote().sendText(value);
                    chimeraService.put(inputData.getFileName(), value);
                }
            }

            logger.info("Processed successfully file={} type={} session={}",
                    new String[]{inputData.getFileName(), inputData.getType().name(), session.getId()});
        }).start();
    }

    private Compress getCompressValue(String compress, String fileName) {
        Compress compressEnum = Compress.getEnum(compress);
        if (compressEnum != null) {
            if (fileName.contains(OSCILLATIONS_100[0])) {
                compressEnum.setCompressValue(Integer.valueOf(OSCILLATIONS_100[1]));
            } else if (fileName.contains(OSCILLATIONS_200[0])) {
                compressEnum.setCompressValue(Integer.valueOf(OSCILLATIONS_200[1]));
            } else if (fileName.contains(OSCILLATIONS_400[0])) {
                compressEnum.setCompressValue(Integer.valueOf(OSCILLATIONS_400[1]));
            } else {
                compressEnum.setCompressValue(0);
            }
            return compressEnum;
        }
        return Compress.N;
    }

    private InputData createInputData(String input) {
        String[] params = input.split("_");
        String fileName = params[0];
        String type = params[1];
        String compress = params[2];
        return new InputData(fileName, Types.getEnum(type), getCompressValue(compress, fileName));
    }

    @OnClose
    public void onClose(Session session) {
        try {
            session.close();
        } catch (Exception ignored) {
        }
        logger.info("Connection closed, session={}", session.getId());
    }

}
