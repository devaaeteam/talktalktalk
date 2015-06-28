angular.module('talktalktalk', ['ngRoute', 'ngStorage'])
   .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signin.html',
                controller: 'SigninCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/profile.html',
                controller: 'MyDashBoardCtrl'
            })
    	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        this.username = $localStorage.profile.username;
                        // console.log('Se redirige a /');
                        // $location.path('/');
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                    	// console.log('Se redirige a /');
                        $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);