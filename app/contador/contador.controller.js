(function() {

    app.controller('ContadorCtrl', [
        'tabs',
        '$http',
        'consts',
        'msgs',
        '$ocLazyLoad',
        'SweetAlert',
        ContadorController

    ])

    function ContadorController(tabs, $http, consts, msgs, $ocLazyLoad, SweetAlert) {

        const vm = this
        const url = `${consts.apiUrl}/contadores`




        //Busca as Contadores
        vm.getContadores = () => {
            $http.get(url).then((resp) => {
                vm.contadores = resp.data
                vm.contador = {}
                tabs.show(vm, { tabList: true, tabCreate: true })
            }).catch((resp) => {
                msgs.addError(resp.data.errors)
            })
        }

        //Cria a contador
        vm.createContador = () => {
            $http.post(url, vm.contador).then((resp) => {
                vm.contador = {}
                vm.getContadores()
                msgs.addSuccess('Contador Cadastrada com sucesso')
            }).catch((resp) => {
                msgs.addError(resp.data.errors)
            })
        }

        //Alera a contador
        vm.updateContador = () => {
            const urlUpdate = `${consts.apiUrl}/contadores/${vm.contador._id}`
            $http.put(urlUpdate, vm.contador).then((resp) => {
                vm.contador = {}
                vm.getContador();
                tabs.show(vm, { tabList: true, tabCreate: true })
                msgs.addSuccess('Contador alterada com sucesso')
            }).catch((resp) => {
                msgs.addError(resp.data)
            })
        }

        //Exclui a contador
        vm.deleteContador = () => {
            SweetAlert.swal({
                    title: "Você Tem Certeza?",
                    text: "Deseja Deletar Contador?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, Deletar!",
                    cancelButtonText: "Não, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        const urlDelete = `${consts.apiUrl}/contadores/${vm.contador._id}`
                        $http.delete(urlDelete, vm.contador).then(function(resp) {
                            vm.contador = {}
                            vm.getContadores()
                            tabs.show(vm, { tabList: true, tabCreate: true })
                        })
                        SweetAlert.swal("Deletado!", "Seu Contador Foi Deletado.", "success");
                    } else {
                        SweetAlert.swal("Cancelled", resp.data, "error");
                    }
                });
        }




        vm.showTabUpdate = (contador) => {
            vm.contador = contador
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = (contador) => {
            vm.contador = contador
            tabs.show(vm, { tabDelete: true })
        }

        vm.cancel = () => {
            tabs.show(vm, { tabList: true, tabCreate: true })
        }

        vm.getContadores()



    }

})()