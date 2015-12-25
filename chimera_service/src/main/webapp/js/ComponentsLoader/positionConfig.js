PositionConfig = function () {
    var positionMap = [];
    init();

    function push(name, x, y, width, height) {
        positionMap.push(new Array(name, x, y, width, height));
    }

    function init() {
        push('loadingLabel',        13,     21,     6,      2);
        push('loadingProgressBar',  13,     21,     6,      2);

        push('textLabel',           3,      1,      2,      2);
        push('time',                5,      1,      1,      2);

        push('build',               12,     1,      2,      2);
        push('video3D',             16,     1,      2,      2);

        push('videoBack',           5,      1,      2,      2);
        push('videoPause',          11,     1,      2,      2);
        push('videoNext',           17,     1,      2,      2);
        push('videoClose',          23,     1,      2,      2);

        push('currentFrame',        13,     35,     4,      2);

        push('cut',                 27,     12,     1,      3);
        push('horizontalCut',       1,      15,     1,      2);
        push('verticalCut',         1,      18,     1,      2);
        push('currentCutType',      1,      1,      4,      2);
        push('closeCut',            13,     1,      4,      2);

        push('opacity',             26,     15,     3,      3);
        push('opacityLabel',        26,     17,     3,      3);
        push('pointSize',           26,     19,     3,      3);
        push('pointSizeLabel',      26,     21,     3,      3);
    }

    this.getPositionsByName = function(name) {
        for (var i = 0; i < positionMap.length; i++) {
            if (name == positionMap[i][0])
            {
                return {
                    x:      positionMap[i][1],
                    y:      positionMap[i][2],
                    width:  positionMap[i][3],
                    height: positionMap[i][4]
                }
            }
        }
    }
}