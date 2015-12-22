DataFormatedProcessor = function () {

    var displacementPhase = 110;

    this.FormatData = function (data) {
        var dataArray = data.match(/.{2}/g);
        return dataArray;
    }
    
    this.FormatPhase = function (phaseString) {
        var degree;

        if (phaseString[0] == '-'){
            degree = (-1 * parseInt(phaseString.charCodeAt(1))) + displacementPhase;
        } else {
            degree = parseInt(phaseString.charCodeAt(1)) + displacementPhase;
        }

        return degree * Math.PI / 180;
    }

    this.FormatFrequency = function (frequencyChar) {
        return charCodeAt(frequencyChar);
    }
};