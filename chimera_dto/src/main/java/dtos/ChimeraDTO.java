package dtos;

import java.util.List;

/**
 * Created by gleb on 05.02.15.
 */
@Deprecated
public class ChimeraDTO {

    private String id;

    private List<String> oscillations;

    private List<String> phases;

    private List<String> frequencies;

    public ChimeraDTO(String id, List<String> oscillations, List<String> phases, List<String> frequencies) {
        this.id = id;
        this.oscillations = oscillations;
        this.phases = phases;
        this.frequencies = frequencies;
    }

    public ChimeraDTO(String id) {
        this.id = id;
    }

    public ChimeraDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getOscillations() {
        return oscillations;
    }

    public void setOscillations(List<String> oscillations) {
        this.oscillations = oscillations;
    }

    public List<String> getPhases() {
        return phases;
    }

    public void setPhases(List<String> phases) {
        this.phases = phases;
    }

    public List<String> getFrequencies() {
        return frequencies;
    }

    public void setFrequencies(List<String> frequencies) {
        this.frequencies = frequencies;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChimeraDTO that = (ChimeraDTO) o;

        if (frequencies != null ? !frequencies.equals(that.frequencies) : that.frequencies != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (oscillations != null ? !oscillations.equals(that.oscillations) : that.oscillations != null) return false;
        return !(phases != null ? !phases.equals(that.phases) : that.phases != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (oscillations != null ? oscillations.hashCode() : 0);
        result = 31 * result + (phases != null ? phases.hashCode() : 0);
        result = 31 * result + (frequencies != null ? frequencies.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ChimeraDTO{" +
                "id='" + id + '\'' +
                ", oscillations=" + oscillations +
                ", phases=" + phases +
                ", frequencies=" + frequencies +
                '}';
    }
}
