describe('alt.rotas-listener', function () {
    var _rootScope, _scope, _location;
    var NOME_CONTROLLER = 'AltRotasController as arCtrl';

    beforeEach(module('alt.rotas-listener', function(AltRotasProvider) {
      AltRotasProvider.rotas = [
        {icone: '1.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
        {icone: '2.jpg', nome: 'A Pagar', url: '/lancamentos/pagar', active: false},
        {icone: '3.jpg', nome: 'Centro de custos', url: '/centro-de-custos', active: false},
        {icone: '4.jpg', nome: 'Categorias', url: '/categorias', active: false},
        {icone: '5.jpg', nome: 'Contas', url: '/contas', active: false},
        {icone: '6.jpg', nome: 'Pessoas', url: '/pessoas', active: false}
      ];
    }));

    beforeEach(inject(function($injector) {
        _rootScope = $injector.get('$rootScope');
        _scope = _rootScope.$new();
        _location = $injector.get('$location');
    }));

    describe('criação', function() {
        it('deve ter a controller criada corretamente', inject(function($controller) {
            $controller(NOME_CONTROLLER, {$scope: _scope});
        }));

        it('deve ter as rotas com os objetos corretos', inject(function($controller) {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            expect(_scope.arCtrl.rotas).toEqual([
                {icone: '1.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
                {icone: '2.jpg', nome: 'A Pagar', url: '/lancamentos/pagar', active: false},
                {icone: '3.jpg', nome: 'Centro de custos', url: '/centro-de-custos', active: false},
                {icone: '4.jpg', nome: 'Categorias', url: '/categorias', active: false},
                {icone: '5.jpg', nome: 'Contas', url: '/contas', active: false},
                {icone: '6.jpg', nome: 'Pessoas', url: '/pessoas', active: false}
            ]);
        }));
    });

    describe('onLoad', function() {
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
            spyOn(_location, 'path').and.returnValue('/contas');

            $controller(NOME_CONTROLLER, {$scope: _scope});

            _scope.arCtrl._marcaRotaAtiva();

            for (var i = 0; i < _scope.arCtrl.rotas.length; i++) {
                if (i === 4) {
                    expect(_scope.arCtrl.rotas[i].active).toBe(true);
                }
                else {
                    expect(_scope.arCtrl.rotas[i].active).toBe(false);
                }
            }
        }));
    })
});
