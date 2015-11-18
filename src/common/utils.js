function formatString(str, params) {
    return str.replace(/\{([^\}]*)\}/gm,
        function () {
            if (params[arguments[1]] != null)
                return params[arguments[1]];
            else
                return '';
        }
    );
}