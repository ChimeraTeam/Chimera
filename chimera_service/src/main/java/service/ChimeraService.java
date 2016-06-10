package service;

import core.ChimeraParser;
import core.ChimeraReader;
import model.InputData;

/**
 * Created by gleb on 5/22/16.
 */
public class ChimeraService {

    private ChimeraReader reader;
    private ChimeraParser parser;
    private CacheManager cacheManager = CacheManager.getCacheManager();

    public void init(InputData inputData) {
        this.reader = new ChimeraReader(inputData.getFileName());
        this.parser = new ChimeraParser(inputData.getType(), inputData.getCompress());
    }

    public String checkInCache(String fileName) {
        return cacheManager.get(fileName);
    }

    public void put(String fileName, String value) {
        cacheManager.put(fileName, value);
    }

    public boolean hasNext() {
        return reader.hasNext();
    }

    public String next() {
        return parser.process(reader.next());
    }
}
