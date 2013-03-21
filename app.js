var angular = window.angular, PJV = window.PJV;

angular.module('pjv', ['pjvFilters']);

angular.module('pjvFilters', []).filter('validateJson', function() {
    return function(text) {
        return PJV.validatePackage(text, this.data.spec, {});
    };
});

// Angular JS controller
window.PackageCtrl = function($scope) {
    $scope.data = {
        results : "",
        spec : "npm"
    };
};

