package service;

import constants.Compress;
import constants.Types;
import core.ChimeraReader;
import core.FrequencyParser;
import core.GeneralParser;
import core.PhaseParser;
import model.InputData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static constants.Types.FREQUENCY;

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
    private GeneralParser parser;

    public String checkInCache(String fileName) {
        return cacheManager.get(fileName);
    }

    public void putToCache(String fileName, String value) {
        cacheManager.put(fileName, value);
    }

    public String getValue() throws IOException {
        return parser.parse(reader.readLine());
    }

    public boolean hasData() throws IOException {
        return reader.hasData();
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

    public void beginTransaction(String key) {
        cacheManager.beginTransaction(key);
    }

    public void commitTransaction() {
        cacheManager.commitTransaction();
    }

    public void rollbackTransaction() {
        cacheManager.rollbackTransaction();
    }

    public void close() {
        this.reader.close();
    }

    private void init(InputData inputData) {
        this.reader = new ChimeraReader(inputData.getFileName());
        if (FREQUENCY.equals(inputData.getType())) {
            this.parser = new FrequencyParser(inputData.getCompress());
        } else {
            this.parser = new PhaseParser(inputData.getCompress());
        }
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
