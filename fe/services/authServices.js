var AuthService = function ($http) {
    return {
        login: function (data, success, error) {
            $http.post('http://localhost:3000/api/auth/login', data).success(success).error(error);
        },
        signin: function (data, success, error) {
            $http.post('http://localhost:3000/api/auth/signin', data).success(success).error(error);
        }
    }
};

AuthService.$inject = ['$http']

angular
	.module('talktalktalk')
    .factory('AuthService', AuthService);