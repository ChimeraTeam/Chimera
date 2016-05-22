package service;


import constants.Compress;
import constants.Types;
import org.apache.log4j.Logger;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by gleb on 06.10.15.
 */

@ServerEndpoint("/websocket")
public class ChimeraWebSocket {

    private Logger logger = Logger.getLogger(ChimeraWebSocket.class);
    private static final String[] OSCILLATIONS_100 = {"100x100x100", "8"};
    private static final String[] OSCILLATIONS_200 = {"200x200x200", "64"};
    private static final String[] OSCILLATIONS_400 = {"400x400x400", "512"};

    @OnMessage
    public void onMessage(String data, Session session) {
        logger.info("Get message message=" + data + " session=" + session.getId());
        new Thread(new Runnable() {
            @Override
            public void run() {

                String fileName = data.split("_")[0];
                String type = data.split("_")[1];
                String compress = data.split("_")[2];

                logger.info("Starting processing file=" + fileName + " type=" + type + " session=" + session.getId());

                ChimeraReader reader = new ChimeraReader(fileName);
                ChimeraParser filter = new ChimeraParser(Types.getEnum(type), getCompressValue(compress, fileName));
                while (reader.hasNext()) {
                    String value = filter.process(reader.next());
                    if (value != null) {
                        if (!session.isOpen()) return;
                        session.getAsyncRemote().sendText(value);
                    }
                }
                logger.info("Processed successfully file=" + fileName + " type=" + type + " session=" + session.getId());
            }
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

    @OnClose
    public void onClose(Session session) {
        try {
            session.close();
        } catch (Exception ignored) {
        }
        logger.info("Connection closed, session=" + session.getId());
    }

}
