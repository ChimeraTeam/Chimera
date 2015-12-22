DataFormatedProcessor = function () {

    var dataArray = [];
	var displacementPhase = 110;
	
    this.FormatData = function (data) {
        dataArray = data.split(",");
        return dataArray;
    }
	
	this.FormatPhase = function (phaseString) {
		if (phaseString.length != 2)
			return;
		
		var sign = phaseString[0];
		var phaseChar = phaseString[1];
		var phase;
		
		if (sign == '+') {
			phase = charCodeAt(phaseChar);
			phase += displacementPhase;
		} else {
			phase = -1 * charCodeAt(phaseChar);
			phase += displacementPhase;
		}
		
		return phase;
	}
	
	this.FormatFrequency = function (frequencyChar) {
		return charCodeAt(frequencyChar);
	}
};