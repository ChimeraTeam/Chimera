package model;

import constants.Compress;
import constants.Types;
import lombok.Builder;
import lombok.Value;

/**
 * Created by gleb on 5/22/16.
 */
@Builder
@Value
public class InputData {
    private String fileName;
    private Types type;
    private Compress compress;
    private String frames;
}
