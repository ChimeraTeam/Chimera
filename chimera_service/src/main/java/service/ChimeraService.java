package service;

import constants.Compress;
import constants.Types;
import core.ChimeraParser;
import core.ChimeraReader;
import model.InputData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by gleb on 5/22/16.
 */
@Component
public class ChimeraService {

    private static final String[] OSCILLATIONS_100 = {"100x100x100", "8"};
    private static final String[] OSCILLATIONS_200 = {"200x200x200", "64"};
    private static final String[] OSCILLATIONS_400 = {"400x400x400", "512"};

    @Autowired
    private CacheManager cacheManager;

    private ChimeraReader reader;
    private ChimeraParser parser;

    public String checkInCache(String fileName) {
        return cacheManager.get(fileName);
    }

    public void putInCache(String fileName, String value) {
        cacheManager.put(fileName, value);
    }

    public boolean hasNext() {
        return reader.hasNext();
    }

    public String next() {
        return parser.process(reader.next());
    }

    public InputData createInputData(String input) {
        String[] params = input.split("_");
        String fileName = params[0];
        String type = params[1];
        String compress = params[2];
        String frames = params[3];
        InputData inputData = new InputData(fileName, Types.getEnum(type), getCompressValue(compress, fileName), frames);
        init(inputData);
        return inputData;
    }

    private void init(InputData inputData) {
        this.reader = new ChimeraReader(inputData.getFileName());
        this.parser = new ChimeraParser(inputData.getType(), inputData.getCompress());
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
}
