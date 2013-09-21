window.angular.module('pjv', ['pjvFilters']);

window.angular.module('pjvFilters', []).filter('validateJson', function() {
    return function(text) {
        return window.PJV.validate(text, this.data.spec, this.data);
    };
});

// Angular JS controller
window.PackageCtrl = function($scope, $http) {
    // Default values for the form
    $scope.data = {
        results : "",
        spec : "npm",
        warnings: true,
        recommendations: true
    };

    $scope.githubFetch = function() {


        var re = /github\.com\/([^\/]+)\/([^\/]+)/,
            m  = re.exec($scope.data.github);

        if (!m ) {
            $scope.data.results = "Invalid github url.";
            window._gaq.push(['_trackEvent', 'Github', 'Invalid', $scope.data.github]);
            return;
        }


        var owner = m[1], repo = m[2],
            apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/package.json?callback=JSON_CALLBACK";

        $scope.data.results = "Fetching from github...";

        $http.jsonp(apiUrl).success(function(resp) {
            window._gaq.push(['_trackEvent', 'Github', 'Fetch', $scope.data.github]);
            $scope.data.results = window.Base64.decode(resp.data.content);
        }).error(function(){
            window._gaq.push(['_trackEvent', 'Github', 'Fail', $scope.data.github]);
        });

    };

    var lastResults=null;
    $scope.$watch('data.results', function() {
        if ($scope.data.results && lastResults != $scope.data.results) {
            window._gaq.push(['_trackEvent', 'Validate', 'Text']);
        }
        lastResults = $scope.data.results;
    });
};

