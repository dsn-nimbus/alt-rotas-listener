describe('alt.rotas-listener', function () {
    var _rootScope, _scope, _location, _rotasProvider;
    var NOME_CONTROLLER = 'AltRotasController as arCtrl';

    describe('criação', function() {
		beforeEach(module('alt.rotas-listener', function(AltRotasProvider) {
			AltRotasProvider.rotas = [
				{icone: '1.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
				{icone: '2.jpg', nome: 'Calendário', url: '/lancamentos/calendario', active: false},
				{icone: '3.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
				{icone: '4.jpg', nome: 'A Pagar', url: '/lancamentos/pagar', active: false},
				{
					icone: '5.jpg', nome: 'Cadastros', url: undefined, active: false,
					subRotas: [
						{icone: '6.jpg', nome: 'Contas', url: '/contas', active: false},
						{icone: '7.jpg', nome: 'Centro de custos', url: '/centro-de-custos', active: false},
						{icone: '8.jpg', nome: 'Categorias', url: '/categorias', active: false},
						{icone: '9.jpg', nome: 'Pessoas', url: '/pessoas', active: false}
					]
				}
			  ];
		}));		
		
		beforeEach(inject(function($injector) {
			_rootScope = $injector.get('$rootScope');
			_scope = _rootScope.$new();
			_location = $injector.get('$location');
		}));
		
        it('deve ter a controller criada corretamente', inject(function($controller) {
            $controller(NOME_CONTROLLER, {$scope: _scope});
        }));

        it('deve ter as rotas com os objetos corretos', inject(function($controller) {
			$controller(NOME_CONTROLLER, {$scope: _scope});

            expect(_scope.arCtrl.rotas).toEqual([
                {icone: '1.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
				{icone: '2.jpg', nome: 'Calendário', url: '/lancamentos/calendario', active: false},
				{icone: '3.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
				{icone: '4.jpg', nome: 'A Pagar', url: '/lancamentos/pagar', active: false},
				{
					icone: '5.jpg', nome: 'Cadastros', url: undefined, active: false,
					subRotas: [
						{icone: '6.jpg', nome: 'Contas', url: '/contas', active: false},
						{icone: '7.jpg', nome: 'Centro de custos', url: '/centro-de-custos', active: false},
						{icone: '8.jpg', nome: 'Categorias', url: '/categorias', active: false},
						{icone: '9.jpg', nome: 'Pessoas', url: '/pessoas', active: false}
					]
				}
            ]);
        }));
    });

    describe('onLoad', function() {
		beforeEach(module('alt.rotas-listener', function(AltRotasProvider) {
			AltRotasProvider.rotas = [
				{icone: '1.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
				{icone: '2.jpg', nome: 'Calendário', url: '/lancamentos/calendario', active: false},
				{icone: '3.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
				{icone: '4.jpg', nome: 'A Pagar', url: '/lancamentos/pagar', active: false},
				{
					icone: '5.jpg', nome: 'Cadastros', url: undefined, active: false,
					subRotas: [
						{icone: '6.jpg', nome: 'Contas', url: '/contas', active: false},
						{icone: '7.jpg', nome: 'Centro de custos', url: '/centro-de-custos', active: false},
						{icone: '8.jpg', nome: 'Categorias', url: '/categorias', active: false},
						{icone: '9.jpg', nome: 'Pessoas', url: '/pessoas', active: false}
					]
				}
			  ];
		}));
		
		beforeEach(inject(function($injector) {
			_rootScope = $injector.get('$rootScope');
			_scope = _rootScope.$new();
			_location = $injector.get('$location');
		}));
		
        it('deve registrar o evento de locationChangeSuccess', inject(function($controller) {
            spyOn(_rootScope, '$on').and.callThrough();

            $controller(NOME_CONTROLLER, {$scope: _scope});

            expect(_rootScope.$on).toHaveBeenCalledWith('$locationChangeSuccess', _scope.arCtrl._marcaRotaAtiva);
        }));

        it('deve registrar o evento de locationChangeSuccess', inject(function($controller) {
            spyOn(_rootScope, '$on').and.callThrough();

            $controller(NOME_CONTROLLER, {$scope: _scope});

            expect(_rootScope.$on).toHaveBeenCalledWith('$viewContentLoaded', _scope.arCtrl._marcaRotaAtiva);
        }));

        it('deve setar a rota correta com active e todas as outras sem active', inject(function($controller) {
            spyOn(_location, 'path').and.returnValue('/lancamentos/calendario');		

            $controller(NOME_CONTROLLER, {$scope: _scope});

            _scope.arCtrl._marcaRotaAtiva();

            for (var i = 0; i < _scope.arCtrl.rotas.length; i++) {
                if (i === 1) {
                    expect(_scope.arCtrl.rotas[i].active).toBe(true);
                }
                else {					
                    expect(_scope.arCtrl.rotas[i].active).toBe(false);
                }
            }
        }));

        it('deve setar a SUB rota correta com active e todas as outras sem active', inject(function($controller) {
            spyOn(_location, 'path').and.returnValue('/pessoas');

            $controller(NOME_CONTROLLER, {$scope: _scope});		

            _scope.arCtrl._marcaRotaAtiva();

            for (var i = 0; i < _scope.arCtrl.rotas.length; i++) {
                if (i === 5) {
					expect(angular.isArray(_scope.arCtrl.rotas[i])).toBe(true);
					
					for (var j = 0; j < _scope.arCtrl.rotas[i].subRotas.length; j++) {
						if (i == 4)
							expect(_scope.arCtrl.rotas[i].subRotas[j].active).toBe(true);
						else
							expect(_scope.arCtrl.rotas[i].subRotas[j].active).toBe(false);
					}
                }
                else {
                    expect(_scope.arCtrl.rotas[i].active).toBe(false);
                }
            }
        }));
    })
});
