var angular = window.angular, PJV = window.PJV;

angular.module('pjv', ['pjvFilters']);

angular.module('pjvFilters', []).filter('validateJson', function() {
    return function(text) {
        return PJV.validatePackage(text, this.data.spec, this.data);
    };
});

// Angular JS controller
window.PackageCtrl = function($scope) {
    // Default values for the form
    $scope.data = {
        results : "",
        spec : "npm",
        warnings: true,
        recommendations: true
    };
};

