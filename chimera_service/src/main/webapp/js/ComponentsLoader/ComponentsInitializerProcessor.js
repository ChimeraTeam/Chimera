ComponentsInitializerProcessor = function () {

    this.SetSceneVisibility = function (container, value) {
        for (var i = 0; i < container.length; i++) {
            this.SetVisibilityControlProperty(container[i], value);
        }
    }

    this.SetVisibilityControlProperty = function (name, value) {
        if (value == true)
            document.getElementById(name).style.visibility = "visible";
        else
            document.getElementById(name).style.visibility = "hidden";
    }

    this.SetPosition  = function(container, grid)
    {
        var config = new PositionConfig();

        for (var i = 0; i < container.length; i++) {
            var values = config.GetByName(container[i]);
            
            document.getElementById(container[i]).style.left = grid.GetFrameX(values[0]);
            document.getElementById(container[i]).style.top = grid.GetFrameY(values[1]);
            document.getElementById(container[i]).style.width = grid.GetFrameX(1) * values[2];
            document.getElementById(container[i]).style.height = grid.GetFrameY(1) * values[3];
        }
    }

    this.SetDisabledButtonProperty = function(id, isDisabled)
    {
        document.getElementById(id).disabled = isDisabled;
    }

    this.SetControlValue = function(id, value)
    {
        document.getElementById(id).value = value;
    }
}