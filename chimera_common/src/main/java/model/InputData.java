package model;

import constants.Compress;
import constants.Types;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by gleb on 5/22/16.
 */
@Data
@AllArgsConstructor
public class InputData {
    private String fileName;
    private Types type;
    private Compress compress;
    private String frames;
}
