const mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(($routeProvider) => {
	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'mainController'
		})
		.when('/saque', {
			templateUrl: 'views/saque.html',
			controller: 'saqueController'
		})
		.when('/deposito', {
			templateUrl: 'views/deposito.html',
			controller: 'depositoController'
		})
		.otherwise({
			redirectTo: '/home'
		});
});

mainApp.controller('mainController', ($scope) => {
		$scope.message = "Escolha uma das opções abaixo:";
});

mainApp.controller('saqueController', ($scope, $http) => {
		$scope.sacar = () => {
				const config = {
						params: {
								vlrSaque: $scope.vlrSaque
						}
				}
				$http.get('/api/notas', config).then((response) => {
				    $scope.resultado = 'Notas sacadas: ' + String(response.data);
			  })
			  .catch((data, status) => {
			    console.error('Erro!', response.status, response.data);
			  });
		}
});

mainApp.controller('depositoController', ($scope, $http) => {
		$scope.depositar = function() {
				const data = { nota: $scope.vlrDeposito };

				$http.post('/api/notas/', data).then((response) => {
						$scope.mensagem = 'Nota adicionada com sucesso!';
				}, (response) => {
						$scope.mensagem = 'Não foi possível adicionar a nota solicitada!';
				});
		}
});
