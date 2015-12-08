Cookies = function () {

    this.setCookie = function (cname, cvalue) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + (60 * 60 * 1000));
        var c_value = escape(cvalue) + "; expires=" + exdate.toUTCString()
                                    + "; path=/";
        document.cookie = cname + "=" + c_value;
    }

    this.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
};;