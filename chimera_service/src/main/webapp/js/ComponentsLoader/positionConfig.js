PositionConfig = function () {
    this.ArrayPositions = new Array(30);

    for (var i = 0; i < 30; i++) {
        this.ArrayPositions[i] = new Array(5);
    }

    this.ArrayPositions[0][0] = "loadingLabel";
    this.ArrayPositions[0][1] = 13;     //x
    this.ArrayPositions[0][2] = 21;     //y
    this.ArrayPositions[0][3] = 6;      //cell width
    this.ArrayPositions[0][4] = 2;      //cell height

    this.ArrayPositions[1][0] = "loadingProgressBar";
    this.ArrayPositions[1][1] = 13;     
    this.ArrayPositions[1][2] = 21;     
    this.ArrayPositions[1][3] = 6;      
    this.ArrayPositions[1][4] = 2;      

    this.ArrayPositions[2][0] = "informLabel";
    this.ArrayPositions[2][1] = 4;
    this.ArrayPositions[2][2] = 4;
    this.ArrayPositions[2][3] = 6;
    this.ArrayPositions[2][4] = 2;
    this.ArrayPositions[3][0] = "openFile";
    this.ArrayPositions[3][1] = 10;
    this.ArrayPositions[3][2] = 4;
    this.ArrayPositions[3][3] = 2;
    this.ArrayPositions[3][4] = 2;
    this.ArrayPositions[4][0] = "selectedFileName";
    this.ArrayPositions[4][1] = 12;
    this.ArrayPositions[4][2] = 4;
    this.ArrayPositions[4][3] = 4;
    this.ArrayPositions[4][4] = 2;

    this.ArrayPositions[5][0] = "textLabel";
    this.ArrayPositions[5][1] = 3;
    this.ArrayPositions[5][2] = 1;
    this.ArrayPositions[5][3] = 2;
    this.ArrayPositions[5][4] = 2;
    this.ArrayPositions[6][0] = "time";
    this.ArrayPositions[6][1] = 5;
    this.ArrayPositions[6][2] = 1;
    this.ArrayPositions[6][3] = 1;
    this.ArrayPositions[6][4] = 2;
    this.ArrayPositions[7][0] = "build";
    this.ArrayPositions[7][1] = 12;
    this.ArrayPositions[7][2] = 1;
    this.ArrayPositions[7][3] = 2;
    this.ArrayPositions[7][4] = 2;
    this.ArrayPositions[8][0] = "video3D";
    this.ArrayPositions[8][1] = 16;
    this.ArrayPositions[8][2] = 1;
    this.ArrayPositions[8][3] = 2;
    this.ArrayPositions[8][4] = 2;
    this.ArrayPositions[9][0] = "videoBack";
    this.ArrayPositions[9][1] = 5;
    this.ArrayPositions[9][2] = 1;
    this.ArrayPositions[9][3] = 2;
    this.ArrayPositions[9][4] = 2;
    this.ArrayPositions[10][0] = "videoPause";
    this.ArrayPositions[10][1] = 11;
    this.ArrayPositions[10][2] = 1;
    this.ArrayPositions[10][3] = 2;
    this.ArrayPositions[10][4] = 2;
    this.ArrayPositions[11][0] = "videoNext";
    this.ArrayPositions[11][1] = 17;
    this.ArrayPositions[11][2] = 1;
    this.ArrayPositions[11][3] = 2;
    this.ArrayPositions[11][4] = 2;
    this.ArrayPositions[12][0] = "videoClose";
    this.ArrayPositions[12][1] = 23;
    this.ArrayPositions[12][2] = 1;
    this.ArrayPositions[12][3] = 2;
    this.ArrayPositions[12][4] = 2;

    this.ArrayPositions[13][0] = "currentFrame";
    this.ArrayPositions[13][1] = 13;
    this.ArrayPositions[13][2] = 35;
    this.ArrayPositions[13][3] = 4;
    this.ArrayPositions[13][4] = 2;

    this.ArrayPositions[14][0] = "cut";
    this.ArrayPositions[14][1] = 27;
    this.ArrayPositions[14][2] = 15;
    this.ArrayPositions[14][3] = 1;
    this.ArrayPositions[14][4] = 3;
    this.ArrayPositions[15][0] = "horizontalCut";
    this.ArrayPositions[15][1] = 1;
    this.ArrayPositions[15][2] = 15;
    this.ArrayPositions[15][3] = 1;
    this.ArrayPositions[15][4] = 2;
    this.ArrayPositions[16][0] = "verticalCut";
    this.ArrayPositions[16][1] = 1;
    this.ArrayPositions[16][2] = 18;
    this.ArrayPositions[16][3] = 1;
    this.ArrayPositions[16][4] = 2;
    this.ArrayPositions[17][0] = "currentCutType";
    this.ArrayPositions[17][1] = 1;
    this.ArrayPositions[17][2] = 1;
    this.ArrayPositions[17][3] = 4;
    this.ArrayPositions[17][4] = 2;
    this.ArrayPositions[18][0] = "closeCut";
    this.ArrayPositions[18][1] = 13;
    this.ArrayPositions[18][2] = 1;
    this.ArrayPositions[18][3] = 4;
    this.ArrayPositions[18][4] = 2;
    
    this.ArrayPositions[19][0] = "opacity";
    this.ArrayPositions[19][1] = 26;
    this.ArrayPositions[19][2] = 18;
    this.ArrayPositions[19][3] = 3;
    this.ArrayPositions[19][4] = 3;
    this.ArrayPositions[20][0] = "opacityLabel";
    this.ArrayPositions[20][1] = 26;
    this.ArrayPositions[20][2] = 20;
    this.ArrayPositions[20][3] = 3;
    this.ArrayPositions[20][4] = 3;


    this.GetByName = function(name) {
        for (var i = 0; i < this.ArrayPositions.length; i++) {
            if (name == this.ArrayPositions[i][0])
            {
                var ret = [];
                ret[0] = this.ArrayPositions[i][1];
                ret[1] = this.ArrayPositions[i][2];
                ret[2] = this.ArrayPositions[i][3];
                ret[3] = this.ArrayPositions[i][4];

                return ret;
            }
        }
    }
}