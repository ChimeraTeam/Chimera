DataInspector = function (strategy) {

    this.Strategy = strategy;

    this.GetData = function()
    {
        var st;

        if (this.Strategy == "Local") {
            st = new GetDataLocalStrategy();
        }
        else if (this.Strategy == "Server") {
            st = new GetDataSocketStrategy();
        }

        return st.GetData();
    };;

    this.GetType = function (configLine) {
        if (configLine == "P")
            return "Phase";
        if (configLine == "F")
            return "Frequency";
    };;

    this.GetOscillatorNumber = function (configLine) {
        if (configLine.indexOf("50x50x50") > -1)
            return Globals.SmallOsillatorsCount;
        else if (configLine.indexOf("100x100x100") > -1)
            return Globals.MediumOsillatorsCount;
        else if (configLine.indexOf("200x200x200") > -1)
            return Globals.LargeOsillatorsCount;
        else
            return Options.DefaultOscilatorsNumber;
    }
};;