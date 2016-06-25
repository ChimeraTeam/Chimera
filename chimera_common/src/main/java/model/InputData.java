package model;

import constants.Compress;
import constants.Types;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Created by gleb on 5/22/16.
 */
@AllArgsConstructor
public class InputData {
    @Getter
    private final String fileName;
    @Getter
    private final Types type;
    @Getter
    private final Compress compress;
    @Getter
    private final String frames;
}
