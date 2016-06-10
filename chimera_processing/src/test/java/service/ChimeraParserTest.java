package service;

import constants.Compress;
import constants.Types;
import core.ChimeraParser;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by gleb on 2/20/16.
 */
public class ChimeraParserTest {

    private ChimeraParser parser;

    private static final String value = "0 0.000000 [ 1 0.500474 -0.127974 ] [ 2 0.466176 -0.098345 ] " +
            "[ 3 0.430653 -0.075887 ] [ 4 0.393931 -0.060424 ] [ 5 0.356054 -0.051721 ] [ 6 0.317079 -0.048630 ] " +
            "[ 7 0.277082 -0.050253 ] [ 8 0.236154 -0.055397 ] [ 9 0.194404 -0.062478 ] [ 10 0.151957 -0.069980 ]" +
            " [ 11 0.108950 -0.077800 ]" +
            " [ 12 0.065536 -0.085861 ] [ 13 0.021873 -0.094070 ] [ 14 6.261310 -0.102332 ] [ 15 6.217650 -0.110557 ]" +
            " [ 16 6.174230 -0.118636 ]" +
            " [ 17 6.131230 -0.126500 ] [ 18 6.088780 -0.134047 ]";

    @Test
    public void testComment() throws Exception {
        String comment = ";index bla bla bla";
        parser = new ChimeraParser(Types.FREQUENCY, Compress.M);
        String actual = parser.process(comment);
        assertNull(actual);
    }

    @Test
    public void testFrequency() throws Exception {
//        String expected = "-0.127974,-0.098345,-0.075887,-0.060424,-0.051721,-0.048630,-0.050253,-0.055397,-0.062478" +
//                ",-0.06998,-0.077800,-0.085861,-0.094070,-0.102332,-0.110557,-0.118636,-0.126500,-0.134047";
        String expected = "111,115,118,120,121,121,121,120,120,119,118,117,115,114,113,112,111,110,110,121,";
        parser = new ChimeraParser(Types.FREQUENCY, Compress.N);
        String actual = parser.process(value);
        assertEquals(expected, actual);
    }

    @Test
    public void testPhase() throws Exception {
//        String expected = "0.500474,0.466176,0.430653,0.393931,0.356054,0.317079,0.277082,0.236154,0.194404" +
//                ",0.151957,0.108950,0.065536,0.021873,6.261310,6.217650,6.174230,6.131230,6.088780";
        String expected = "28,26,24,22,20,18,15,13,11,8,6,3,1,358,356,353,351,348,";
        parser = new ChimeraParser(Types.PHASE, Compress.N);
        String actual = parser.process(value);
        assertEquals(expected, actual);
    }

    @Test
    public void testCompressedFrequency() throws Exception {
//        original:
//        String expected = "-0.127974,-0.098345,-0.075887,-0.060424,-0.051721,-0.048630,-0.050253,-0.055397,-0.062478" +
//                ",-0.06998,-0.077800,-0.085861,-0.094070,-0.102332,-0.110557,-0.118636,-0.126500,-0.134047";
//        pre-compressed:
//        String expected = "111,115,118,120,121,121,121,120,120,119,118,117,115,114,113,112,111,110,";
        String expected = "120,112,112,120,";
        Compress compress = Compress.S;
        compress.setCompressValue(8);
        parser = new ChimeraParser(Types.FREQUENCY, compress);
        String actual = parser.process(value);
        assertEquals(expected, actual);
    }

    @Test
    public void testCompressedPhase() throws Exception {
//        original:
//        String expected = "0.500474,0.466176,0.430653,0.393931,0.356054,0.317079,0.277082,0.236154,0.194404" +
//                ",0.151957,0.108950,0.065536,0.021873,6.261310,6.217650,6.174230,6.131230,6.088780";
//        pre-compressed:
//        String expected = "28,26,24,22,20,18,15,13,11,8,6,3,1,358,356,353,351,348,";
        String expected = "13,353,";
        Compress compress = Compress.S;
        compress.setCompressValue(8);
        parser = new ChimeraParser(Types.PHASE, compress);
        String actual = parser.process(value);
        assertEquals(expected, actual);
    }
}