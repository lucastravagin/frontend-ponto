(function () {

    angular.module('qrPonto').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts) {

        let empresa = null

        function getUser() {
            if (!empresa) {
                empresa = JSON.parse(localStorage.getItem(consts.userKey))
                $http.defaults.headers.common.Authorization = empresa ? empresa.token : null
            }
            return empresa
        }

        function signup(empresa, callback) {
            submit('signup', empresa, callback)
        }

        function login(empresa, callback) {
            submit('login', empresa, callback)
        }

        function submit(url, empresa, callback) {
            $http.post(`${consts.oapiUrl}/${url}`, empresa)
                .then(resp => {
                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
                    $http.defaults.headers.common.Authorization = resp.data.token
                    location.reload();
                    if (callback) callback(null, resp.data)
                }).catch(function (resp) {
                    if (callback) callback(resp.data.errors, null)
                })
        }

        function buscaCNPJ(cnpj, callback) {
            $http.get(`${consts.buscaCNPJ}/${cnpj}`)
                .then((resp) => {
                    if (callback) callback(null, resp.data)
                }).catch((error) => {
                    if (callback) callback(resp.data.errors, null)
                })
        }

        function logout(callback) {
            empresa = null
            localStorage.removeItem(consts.userKey)
            $http.defaults.headers.common.Authorization = ''
            if (callback) callback(null)
        }

        function validateToken(token, callback) {
            if (token) {
                $http.post(`${consts.oapiUrl}/validateToken`, { token })
                    .then(resp => {
                        if (!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch(function (resp) {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }

        return { signup, login, logout, getUser, validateToken, buscaCNPJ }
    }

})()