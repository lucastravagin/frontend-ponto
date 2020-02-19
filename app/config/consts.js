(function() {
    app.constant('consts', {
        appName: 'Qr Ponto',
        version: '1.0',
        owner: 'Oursys',
        year: '2019',
        apiUrl: 'http://localhost:4040/api',
        oapiUrl: 'http://localhost:4040/oapi',
        buscaCNPJ: 'https://www.receitaws.com.br/v1/cnpj',
        userKey: 'qr_ponto_user'
    }).run(['$rootScope', 'consts', function($rootScope, consts) {
        $rootScope.consts = consts
    }])
})()