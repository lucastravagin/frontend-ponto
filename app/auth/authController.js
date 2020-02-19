(function () {

    angular.module('qrPonto').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this

        
        vm.loginMode = true
        
        vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.login = () => {
            
            auth.login(vm.empresa, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.signup = () => {
            auth.signup(vm.empresa, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }

        vm.buscaCNPJ = () => {
            auth.buscaCNPJ(vm.empresa.cnpj, (err) => {
                console.log(err)
            })
        }
    }

})()