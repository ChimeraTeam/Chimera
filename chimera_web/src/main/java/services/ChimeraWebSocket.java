package services;


import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by gleb on 06.10.15.
 */

@ServerEndpoint("/websocket")
public class ChimeraWebSocket {

    @OnOpen
    public void onOpen(Session peer) {
        System.out.println("open websocket");
    }

    @OnMessage
    public String onMessage(String file) {
        System.out.println("Message " + file);
        return "aaaaaaaaaaa";
    }

    @OnClose
    public void onClose(Session peer) {
        System.out.println("On close");
    }

}
