package services;

import converters.ChimeraDTOConverter;
import domain.ChimeraDomain;
import dtos.ChimeraDTO;
import interfaces.ISolrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by gleb on 05.02.15.
 */
@Service
public class SolrService {

    @Autowired
    private ISolrRepository repository;

    public boolean saveState(ChimeraDTO chimeraDTO) {
        ChimeraDomain chimeraDomain = ChimeraDTOConverter.convert(chimeraDTO);
        if (chimeraDomain == null) return Boolean.FALSE;
        return repository.addFeed(chimeraDomain) != null ? Boolean.TRUE : Boolean.FALSE;
    }

    public boolean saveStates(List<ChimeraDTO> chimeraDTOs) {
        if (chimeraDTOs == null) return Boolean.FALSE;
        List<ChimeraDomain> chimeraDomains = ChimeraDTOConverter.convertDTOs(chimeraDTOs);
        return repository.addFeeds(chimeraDomains) != null ? Boolean.TRUE : Boolean.FALSE;
    }

    public boolean deleteState(ChimeraDTO chimeraDTO) {
        if (chimeraDTO == null) return Boolean.FALSE;
        ChimeraDomain chimeraDomain = ChimeraDTOConverter.convert(chimeraDTO);
        repository.deleteFeed(chimeraDomain);
        return Boolean.TRUE;
    }

    public boolean deleteState(String id) {
        if (id == null) return Boolean.FALSE;
        repository.deleteFeed(id);
        return Boolean.TRUE;
    }

    public void deleteAllStates() {
        repository.deleteAllFeeds();
    }

    public ChimeraDTO getState(String id) {
        if (id == null) return null;
        ChimeraDomain chimeraDomain = repository.getFeed(id);
        return ChimeraDTOConverter.convert(chimeraDomain);
    }

    public List<ChimeraDTO> getStates() {
        return ChimeraDTOConverter.convertDomains(repository.getAll());
    }

    public Long count() {
        return repository.totalCount();
    }

}
