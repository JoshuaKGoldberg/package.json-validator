(function() {
    var Github = {};
    window.Github = Github;

    // Fetch the package.json from a github repo via the api
    // http://developer.github.com/v3/repos/contents/
    Github.fetchPackageJson = function(url, callback) {
        var re = /github\.com\/([^\/]+)\/([^\/]+)/,
            m  = re.exec(url);
        if (!m ) {
            callback("Invalid github url.");
            return;
        }

        var owner = m[1], repo = m[2],
            apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/package.json";

        jQuery.ajax(apiUrl, {
            dataType: 'jsonp',
            success: function(resp) {
                console.log("data.content", resp.data.content);
                // Data comes back base64 encoded
                var decoded = Base64.decode(resp.data.content);
                callback(decoded);
            },
            error: function(data) {
                callback("There was an error communicating with github");
                console.log(data);
            }

        });

    };


})();

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        return output;

    }

};
