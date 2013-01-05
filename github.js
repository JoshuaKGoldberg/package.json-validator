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
