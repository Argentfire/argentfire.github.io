(function () {
    var agency = function ($http) {
        var getDataArray = function (model) {
        return $http
            .get(`https://localhost:7084/${model}`)
            .then(function (response) {
                return response.data;
            });
        };
        var getDataElement = function (model, id) {
            return $http
            .get(`https://localhost:7084/${model}/${id}`)
            .then(function (response) {
                return response.data;
            });
        };

        var postData = function (model, object) {
            return $http
            .post(`https://localhost:7084/${model}`, object)
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        };

        return {
            getDataArray: getDataArray,
            getDataElement: getDataElement,
            postData: postData
        };
    };

    var module = angular.module("Agency");
    module.factory("agency", agency);
})();
