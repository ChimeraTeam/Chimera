package service;


import constants.Types;

import javax.websocket.MessageHandler;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by gleb on 06.10.15.
 */

@ServerEndpoint("/websocket")
public class ChimeraWebSocket {

    @OnOpen
    public void onOpen(Session session) {
        session.addMessageHandler(new MessageHandler.Whole<String>() {
            @Override
            public void onMessage(String data) {
                try {
                    Thread.sleep(2000);
                    String fileName = data.split("_")[0];
                    String type = data.split("_")[1];
                    ChimeraReader reader = new ChimeraReader(fileName);
                    ChimeraFilter filter = new ChimeraFilter(Types.getEnum(type));
                    while (reader.hasNext()) {
                        String value = filter.process(reader.next());
                        if (value != null) {
//                            session.getAsyncRemote().sendBinary(ByteBuffer.wrap(LZW.compress(value)));
                            session.getAsyncRemote().sendText(value);
                        }
//                        session.getAsyncRemote().sendBinary(ByteBuffer.allocate(2));
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });
    }


    @OnClose
    public void onClose(Session peer) {
        System.out.println("close");
    }

}
