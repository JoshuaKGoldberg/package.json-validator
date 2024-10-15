window.angular.module("pjv", ["pjvFilters"]);

window.angular.module("pjvFilters", []).filter("validateJson", function () {
	return function (text) {
		return window.PJV.validate(text, this.data.spec, this.data);
	};
});

// Angular JS controller
window.PackageCtrl = function ($scope, $http) {
	// Default values for the form
	$scope.data = {
		results: "",
		spec: "npm",
		warnings: true,
		recommendations: true,
	};

	$scope.githubFetch = function () {
		const re = /github\.com\/([^\/]+)\/([^\/]+)/,
			m = re.exec($scope.data.github);

		if (!m) {
			$scope.data.results = "Invalid github url.";
			return;
		}

		const owner = m[1];
		const repo = m[2];
		const apiUrl =
			"https://api.github.com/repos/" +
			owner +
			"/" +
			repo +
			"/contents/package.json?callback=JSON_CALLBACK";

		$scope.data.results = "Fetching from github...";

		$http.jsonp(apiUrl).success(function (resp) {
			$scope.data.results = window.Base64.decode(resp.data.content);
		});
	};
};
