package converters;

import domain.ChimeraDomain;
import dtos.ChimeraDTO;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by gleb on 05.02.15.
 */
public class ChimeraDTOConverter {

    private ChimeraDTOConverter() {
    }

    public static ChimeraDomain convert(ChimeraDTO chimeraDTO) {
        if (chimeraDTO == null) return null;
        ChimeraDomain chimeraDomain = new ChimeraDomain();
        chimeraDomain.setId(chimeraDTO.getId());
        chimeraDomain.setFrequencies(chimeraDTO.getFrequencies());
        chimeraDomain.setOscillations(chimeraDTO.getOscillations());
        chimeraDomain.setPhases(chimeraDTO.getPhases());
        return chimeraDomain;
    }

    public static ChimeraDTO convert(ChimeraDomain chimeraDomain) {
        if (chimeraDomain == null) return null;
        ChimeraDTO chimeraDTO = new ChimeraDTO();
        chimeraDTO.setId(chimeraDomain.getId());
        chimeraDTO.setPhases(chimeraDomain.getPhases());
        chimeraDTO.setFrequencies(chimeraDomain.getFrequencies());
        chimeraDTO.setOscillations(chimeraDomain.getOscillations());
        return chimeraDTO;
    }

    public static List<ChimeraDTO> convertDomains(List<ChimeraDomain> chimeraDomains) {
        if (chimeraDomains == null) return null;
        List<ChimeraDTO> chimeraDTOs = new ArrayList<>();
        for (ChimeraDomain chimeraDomain : chimeraDomains) {
            ChimeraDTO chimeraDTO = new ChimeraDTO();
            chimeraDTO.setId(chimeraDomain.getId());
            chimeraDTO.setOscillations(chimeraDomain.getOscillations());
            chimeraDTO.setFrequencies(chimeraDomain.getFrequencies());
            chimeraDTO.setPhases(chimeraDomain.getPhases());
            chimeraDTOs.add(chimeraDTO);
        }
        return chimeraDTOs;
    }

    public static List<ChimeraDTO> convertDomains(Iterable chimeraDomains) {
        if (chimeraDomains == null) return null;
        List<ChimeraDTO> chimeraDTOs = new ArrayList<>();
        for (Object chimeraDomain : chimeraDomains) {
            chimeraDTOs.add((ChimeraDTO) chimeraDomain);
        }
        return chimeraDTOs;
    }


    public static List<ChimeraDomain> convertDTOs(List<ChimeraDTO> chimeraDTOs) {
        if (chimeraDTOs == null) return null;
        List<ChimeraDomain> chimeraDomains = new ArrayList<>();
        for (ChimeraDTO chimeraDTO : chimeraDTOs) {
            ChimeraDomain chimeraDomain = new ChimeraDomain();
            chimeraDomain.setId(chimeraDTO.getId());
            chimeraDomain.setOscillations(chimeraDTO.getOscillations());
            chimeraDomain.setFrequencies(chimeraDTO.getFrequencies());
            chimeraDomain.setPhases(chimeraDTO.getPhases());
            chimeraDomains.add(chimeraDomain);
        }
        return chimeraDomains;
    }

}
