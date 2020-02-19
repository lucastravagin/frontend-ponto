(function() {

    app.controller('EmpresaCtrl', [
        'tabs',
        '$http',
        'consts',
        'msgs',
        '$ocLazyLoad',
        'SweetAlert',
        EmpresaController

    ])

    function EmpresaController(tabs, $http, consts, msgs, $ocLazyLoad, SweetAlert) {

        const vm = this
        const url = `${consts.apiUrl}/empresas`

 

        //Busca as Empresas
        vm.getEmpresas = () => {
            $http.get(url).then((resp) => {
                vm.empresas = resp.data
                vm.empresa = {}
                tabs.show(vm, { tabList: true, tabCreate: true })
            }).catch((resp) => {
                msgs.addError(resp.data.errors)
            })
        }

        //Cria a empresa
        vm.createEmpresa = () => {
            $http.post(url, vm.empresa).then((resp) => {
                vm.empresa = {}
                vm.getEmpresas()
                msgs.addSuccess('Empresa Cadastrada com sucesso')
            }).catch((resp) => {
                msgs.addError(resp.data.errors)
            })
        }

        //Alera a empresa
        vm.updateEmpresa = () => {
            const urlUpdate = `${consts.apiUrl}/empresas/${vm.empresa._id}`
            $http.put(urlUpdate, vm.empresa).then((resp) => {
                vm.empresa = {}
                vm.getEmpresa();
                tabs.show(vm, { tabList: true, tabCreate: true })
                msgs.addSuccess('Empresa alterada com sucesso')
            }).catch((resp) => {
                msgs.addError(resp.data)
            })
        }

        //Exclui a empresa
        vm.deleteEmpresa = (empresa) => {
            SweetAlert.swal({
                    title: "Você Tem Certeza?",
                    text: "Deseja Deletar Empresa?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ff4b5b",
                    confirmButtonText: "Sim, Deletar!",
                    cancelButtonText: "Não, cancelar!",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        const urlDelete = `${consts.apiUrl}/empresas/${empresa._id}`
                        $http.delete(urlDelete, vm.empresa).then(function(resp) {
                            vm.empresa = {}
                            vm.getEmpresas()
                            tabs.show(vm, { tabList: true, tabCreate: true })
                            SweetAlert.swal("Deletado!", "Sua Empresa Foi Deletada.", "success");
                        })
                        
                    } else {
                        SweetAlert.swal("Cancelled", resp.data, "error");
                    }
                });
        }




        vm.showTabUpdate = (empresa) => {
            vm.empresa = empresa
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = (empresa) => {
            vm.empresa = empresa
            tabs.show(vm, { tabDelete: true })
        }

        vm.cancel = () => {
            tabs.show(vm, { tabList: true, tabCreate: true })
        }

        vm.getEmpresas()



    }

})()