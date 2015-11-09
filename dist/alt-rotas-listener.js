;(function() {
  'use strict';

  angular
    .module('alt.rotas-listener', [])
    .provider('AltRotas', [function() {
      var self = this;

      self.rotas = [];

      /*
        Rotas exemplo

        [{icone: '1.jpg', nome: 'A Receber', url: '/lancamentos/receber', active: false},
        {icone: '2.jpg', nome: 'A Pagar', url: '/lancamentos/pagar', active: false},
        {icone: '3.jpg', nome: 'Centro de custos', url: '/centro-de-custos', active: false},
        {icone: '4.jpg', nome: 'Categorias', url: '/categorias', active: false},
        {icone: '5.jpg', nome: 'Contas', url: '/contas', active: false},
        {icone: '6.jpg', nome: 'Pessoas', url: '/pessoas', active: false}]

        A comparação será feita pelo $location.path === rota[indice].url,
        caso estas informações batam, aquela rota específica terá o active como true,
        e todas as outras terão o active como false.
      */

      self.$get = [function() {
        return self.rotas;
      }];
    }])
    .controller('AltRotasController', ['$rootScope', '$location', 'AltRotas', function($rootScope, $location, AltRotas) {
      var self = this;

      self.rotas = AltRotas;

      self._marcaRotaAtiva = function() {
        var _path = $location.path();

        angular.forEach(self.rotas, function(rota) {
          rota.active = !!(~_path.indexOf(rota.url));
        });
      };

      $rootScope.$on('$viewContentLoaded', self._marcaRotaAtiva);
      $rootScope.$on('$locationChangeSuccess', self._marcaRotaAtiva);
    }]);
}());
