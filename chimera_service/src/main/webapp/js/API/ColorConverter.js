this.ColorConverter = function () {
    this.convertHsvToHsl = function (hue, sat, val) {
        return {
            h : hue,
            s : sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue),
            l : hue / 2
        }
    }
}