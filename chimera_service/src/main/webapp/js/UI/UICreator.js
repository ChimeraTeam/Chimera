UICreator = function () {

    this.setSceneVisibility = function (container, value) {
        for (var i = 0; i < container.length; i++) {
            this.setVisibilityControlProperty(container[i], value);
        }
    }

    this.setVisibilityControlProperty = function (name, value) {
        if (value)
            document.getElementById(name).style.visibility = "visible";
        else
            document.getElementById(name).style.visibility = "hidden";
    }

    this.setPosition  = function(container, grid) {
        var config = new PositionConfig();

        for (var i = 0; i < container.length; i++) {
            var values = config.getPositionsByName(container[i]);
            
            document.getElementById(container[i]).style.left = grid.GetFrameX(values.x);
            document.getElementById(container[i]).style.top = grid.GetFrameY(values.y);
            document.getElementById(container[i]).style.width = grid.GetFrameX(1) * values.width;
            document.getElementById(container[i]).style.height = grid.GetFrameY(1) * values.height;
        }
    }

    this.setDisabledButtonProperty = function(id, isDisabled) {
        document.getElementById(id).disabled = isDisabled;
    }

    this.setControlValue = function(id, value) {
        document.getElementById(id).value = value;
    }

    this.getControlValue = function(id) {
        return document.getElementById(id).value;
    }

    this.setCheckBoxCheckedValue = function (id, isChecked) {
        document.getElementById(id).checked = isChecked;
    }

    this.getCheckBoxCheckedValue = function (id) {
        return document.getElementById(id).checked.toString();
    }
}