DataFormatedProcessor = function () {

    var dataArray = [];

    this.FormatData = function (data) {
        dataArray = data.split(",");
        return dataArray;
    }
    
}