package model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created by gleb on 5/22/16.
 */
@Data
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ChimeraMessage implements Comparable<ChimeraMessage> {

    private Integer id;
    private String key;
    private String value;

    @Override
    public int compareTo(ChimeraMessage o) {
        return id.compareTo(o.getId());
    }
}
