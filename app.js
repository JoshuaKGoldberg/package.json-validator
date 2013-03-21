var angular = window.angular, PJV = window.PJV;

angular.module('pjv', ['pjvFilters']);

angular.module('pjvFilters', []).filter('validateJson', function() {
    return function(text) {
        return PJV.validatePackage(text, this.data.spec, this.data);
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
                return;
            }

            var owner = m[1], repo = m[2],
                apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/package.json?callback=JSON_CALLBACK";

        $http.jsonp(apiUrl).success(function(resp) {
            $scope.data.results = window.Base64.decode(resp.data.content);
        });
    };
};

