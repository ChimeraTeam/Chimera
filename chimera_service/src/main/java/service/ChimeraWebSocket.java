package service;


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

    @OnMessage
    public void onMessage(String data, Session session) {
        logger.info("Get message message=" + data + " session=" + session.getId());
        new Thread(new Runnable() {
            @Override
            public void run() {
                String fileName = data.split("_")[0];
                String type = data.split("_")[1];
                logger.info("Starting processing file=" + fileName + " type=" + type + " session=" + session.getId());
                ChimeraReader reader = new ChimeraReader(fileName);
                ChimeraFilter filter = new ChimeraFilter(Types.getEnum(type));
                while (reader.hasNext()) {
                    String value = filter.process(reader.next());
                    if (value != null) {
                        if (!session.isOpen()) return;
                        session.getAsyncRemote().sendText(LZW.compress(value).toString());
                    }
                }
                logger.info("Processed successfully file=" + fileName + " type=" + type + " session=" + session.getId());
            }
        }).start();
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
