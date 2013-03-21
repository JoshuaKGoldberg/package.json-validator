var angular = window.angular, PJV = window.PJV;

angular.module('pjv', ['pjvFilters']);

angular.module('pjvFilters', []).filter('validateJson', function() {
    return function(text) {
        console.log("hi", text);
        return PJV.validatePackage(text, "npm", {});
    };
});

// Angular JS controller
window.PackageCtrl = function($scope) {
    console.log("Scope", $scope);
};

