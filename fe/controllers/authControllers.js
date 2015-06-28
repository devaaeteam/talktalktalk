var HomeController = function ($scope, $location, $localStorage, AuthService){
  	// if ($localStorage.profile) $scope.username = $localStorage.profile.username;
  	$scope.logout = function () {
  		delete $localStorage.token;
        delete $localStorage.profile;
	};
    if ($localStorage.profile){
        $scope.welcome = "Bienvenido " + $localStorage.profile.name;
    } else {
        $location.path('/')
    }
};


var LoginController = function ($scope, $location, $localStorage, AuthService){
	$scope.login = function (){
		var data = {
			username: $scope.username,
			password: $scope.password
		};
		AuthService.login(data, function(response){
            if (response.success == false)  {
            	console.log(response.success);
            }
            else {
            	$localStorage.token = response.token;
            	console.log('Se redirige a /dashboard');
                $localStorage.profile = response.profile;
                $location.path('/');
            }
        }, function (response) {
        	console.log(response.message);
        });
	};		
};

var SigninController = function ($scope, $location, AuthService){
    $scope.signin = function () {
		var data = {
			username: $scope.username,
			password: $scope.password,
			name: $scope.name,
			surname: $scope.surname,
			email: $scope.email
		};
		AuthService.signin(data, function(response){
            if (response.success == false)  {
            	console.log(response.success);
            }
            else {
            	console.log('Se redirige a /');
            	$location.path('/');
            }
        }, function (response) {
        	console.log(response.message);
        });
  	};
};

var MyDashboardController = function ($scope, $localStorage){
    if ($localStorage.profile){
        $scope.username = $localStorage.profile.username;
        $scope.name = $localStorage.profile.name;
        $scope.surname = $localStorage.profile.surname;
        $scope.email = $localStorage.profile.email
    } else {
        $location.path('/')
    }
};

HomeController.$inject = ['$scope', '$location', '$localStorage', '$timeout', 'AuthService']
LoginController.$inject = ['$scope', '$location', '$localStorage', 'AuthService']
SigninController.$inject = ['$scope', '$location', 'AuthService']
MyDashboardController.$inject = ['$scope', '$localStorage']

angular
	.module('talktalktalk')
	.controller('HomeCtrl', HomeController)
	.controller('LoginCtrl', LoginController)
	.controller('SigninCtrl', SigninController)
    .controller('MyDashBoardCtrl', MyDashboardController);

