(function() {

    app.controller('ColaboradorCtrl', [
        'tabs',
        '$http',
        'consts',
        'msgs',
        '$ocLazyLoad',
        'SweetAlert',
        ColaboradorController

    ])

    function ColaboradorController(tabs, $http, consts, msgs, $ocLazyLoad, SweetAlert) {

        
        const vm = this
        const url = `${consts.apiUrl}/colaboradores`
        vm.empresa = JSON.parse(localStorage.getItem(consts.userKey))
        const urlColaboradores =  `${consts.apiUrl}/colaborador-empresa/${vm.empresa._id}`
        

        //Busca as colaborador
        vm.getColaboradores = () => {
            $http.get(urlColaboradores).then((resp) => {
                vm.colaboradores = resp.data
                vm.colaborador = {}
                tabs.show(vm, { tabList: true, tabCreate: true })
            }).catch((resp) => {
                msgs.addError(resp.data)
            })
        }

        //Cria a colaborador
        vm.createColaborador = () => {
            vm.colaborador.empresa = vm.empresa._id
            $http.post(url, vm.colaborador).then((resp) => {
                vm.colaborador = {}
                vm.getColaboradores()
                msgs.addSuccess('Colaborador cadastrado com sucesso')
            }).catch((resp) => {
                msgs.addError(resp.data.errors)
            })
        }

        //Alera a colaborador
        vm.updateColaborador = () => {
            const urlUpdate = `${consts.apiUrl}/colaboradores/${vm.colaborador._id}`
            $http.put(urlUpdate, vm.colaborador).then((resp) => {
                vm.colaborador = {}
                vm.getColaborador();
                tabs.show(vm, { tabList: true, tabCreate: true })
                msgs.addSuccess('Colaborador alterado com sucesso')
            }).catch((resp) => {
                msgs.addError(resp.data)
            })
        }

        //Exclui a colaborador
        vm.deleteColaborador = (colaborador) => {
            SweetAlert.swal({
                    title: "Você Tem Certeza?",
                    text: "Deseja Deletar Funcionário?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, Deletar!",
                    cancelButtonText: "Não, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        const urlDelete = `${consts.apiUrl}/colaboradores/${colaborador._id}`
                        $http.delete(urlDelete, vm.colaborador).then(function(resp) {
                            vm.colaborador = {}
                            vm.getColaboradores()
                            tabs.show(vm, { tabList: true, tabCreate: true })
                        })
                        SweetAlert.swal("Deletado!", "Seu Funcionário Foi Deletado.", "success");
                    } else {
                        SweetAlert.swal("Cancelado", resp.data, "error");
                    }
                });
        }




        vm.showTabUpdate = (colaborador) => {
            vm.colaborador = colaborador
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = (colaborador) => {
            vm.colaborador = colaborador
            tabs.show(vm, { tabDelete: true })
        }

        vm.cancel = () => {
            tabs.show(vm, { tabList: true, tabCreate: true })
        }


        vm.getColaboradores()


      



    }

})()