(function() {
    app.controller('DashboardCtrl', [
        '$http',
        'consts',
        DashboardController
    ])

    function DashboardController($http, consts) {
        const vm = this

        vm.getSummary = function() {
            $http.get(`${consts.apiUrl}/colaboradores/count`).then(function(resp) {
                
                vm.total = resp.data
            })
        }

        vm.getSummary()
    }
})()