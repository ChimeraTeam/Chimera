package t1.launcher;

import t1.processor.Chimera;

/**
 * Created by gleb on 06.10.15.
 */
public class Application {
    public static void main(String[] args) {
        Chimera chimeraReader = new Chimera("/home/gleb/dev/trajectories/t/small");
        chimeraReader.setOutput("/tmp/out");
        chimeraReader.process();
    }
}
