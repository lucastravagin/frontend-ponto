(function () {
    app.controller('RelatorioCtrl', [
        '$http',
        'consts',
        'msgs',
        RelatorioController
    ])

    function RelatorioController($http, consts, msgs) {

        $('.xp-select2-single').select2();


        const vm = this
        const url = `${consts.apiUrl}/colaboradores`
        vm.empresa = JSON.parse(localStorage.getItem(consts.userKey))
        const urlColaboradores = `${consts.apiUrl}/colaborador-empresa/${vm.empresa._id}`


        vm.colaboradores = [

        ]

        //Busca as colaborador
        vm.getColaboradores = () => {
            $http.get(urlColaboradores).then((resp) => {
                vm.colaboradores = resp.data
                vm.colaborador = {}
            }).catch((resp) => {
                msgs.addError(resp)
            })
        }

        vm.getColaboradores()


        vm.localSearch = function (str, colaboradores) {
            var matches = []
            colaboradores.forEach(function (colaborador) {
                var fullName = colaborador.nome + ' ' + colaborador.pin + '' + colaborador.cpf;
                if ((colaborador.nome.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
                    (colaborador.pin.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
                    (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
                    matches.push(colaborador);
                }
            });
            return matches;
        };


        vm.getHorasTrabalhadas = (colaborador) => {
            console.log(colaborador)
            $http.get(`${url}/${colaborador.originalObject._id}/horas_trabalhadas`)
                .then((resp) => {
                    vm.horas_trabalhadas = resp.data
                    carregaTable(colaborador)
                })
                .catch((resp) => {
                    msgs.addError(resp.data)
                })
        }

       function carregaTable(colaborador) {
        setTimeout(() => {
            /* -----  Table - Datatable  ----- */
            $('#datatable').DataTable();

            $('#xp-default-datatable').DataTable({
                "order": [[3, "desc"]]
            });

            var table = $('#datatable-buttons').DataTable({
                lengthChange: false,
                buttons: ['copy', 'excel', 'pdf', 'print'],
                buttons: [
                    {
                        extend: 'pdf',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        },
                        pageSize: 'A4',
                        text: 'PDF',
                        title: `Relatório de Ponto ${colaborador.originalObject.nome}`,
                        customize: function (doc) {
                            doc.content[1].margin = [25, 0, 25, 0] //left, top, right, bottom
                            doc.content[1].table.widths = ['25%', '10%', '10%', '10%', '10%', '10%', '25%']

                            doc.content.splice(1, 0, {
                                margin: [0, 0, 0, 12],
                                alignment: 'center',
                                image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABFCAYAAAAIGLXIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5AMBABA2O2VpSQAAC7VJREFUaN7dmnt01MUVxz8zv80mhCSCPBTkjVJLJVAbnhWpFYVapT4Aj6WKDxAJilXqq9qeWqpQBFF7UKmt9kitWsBqUdHWU1ERRPDBQyoqRRClEiAPEvLa/d3+cWezm2ST/DYP9PSe8zub3czMb75z78y993vH0Ipy+P48MJA9eyO77jszf/LW2XdtLD4xB+MLUA2UAgXALmArsBF4D9gNRAEQwADLc1N6t2ktECWLh2KMkNkjm4p9JVPLJGPhBVtv6PRm4ckG4zfUrRz4HNgAPA/8C9gPgDXgS2BAtlVALBoKAlnXZ3Nkb+kVImaxQTqL4DfRtR1wIjAFWAa8DMwBuuOLtpi0BSa+3/ZAihcMRXz4fF0BhxeXXgHcC3QUNZJUJAQMARai2vkJkAGAsQqorYAUzx8GAhX7yzhhRJcrHYgOLV0c4NvAH4CHgX41vzYCptlAiu5WEFJiyejS/iqERa0EIibpwFTgr8DpTYFpFpCiucPAh8rSCCZL2gJEonwH3T/nNwYmZSCFdw5DBExVlHBmaBqwCDimgeatdSr2Qs3swobApASk8JfDQaC6ImIk5E1HWNgICIwhClS5J9pCMMcBvwPGAlBaChM31/wzFHSUQ3cMRwS8Cs+kZTANuKchEAKEbaRqdIcPf/3mwdxNeBUWyAZ6AoOB4eix66UIpjtwHzCZrKzttRYtEIifDwcDkYhv0tLtdKzcYyw5WDAeYAVjdVrGuu8eZe1D5WfN+ejS9ffuOScBpRiM6e5WdhowitRN/FngMuAwAMtzmwZy8FYF4UV844ft1cayAE9ydMKNA8EwHliblb9JzcDUe10nYDrqBDunACQK3Ag8gABFHzQO5OBNI8AI1RI14ZB3NZYFWHKM5yaeCpBESdyoxoDIucD9JPqMpmUncA7wEY2p9MCcEXo6RTyTZr0ZonsiJ4UXNSzLc+MxlAioJ58GfJrCKP2BK2NaTgrkwA0jQCBSLUasfw1iFqCbtXWldkD4KmpiRSmMMBmR/kmBFMwegfhAVEzIMzMFftsmIJKB8f2/oUdsUOkL/KAekIJrR4JANOIbMWYmML9NQdQFY60AS4C3U+h9DpBZA2T/zJGqiYhnPWvzkTbWRENg4EvUiwd1oEOAARZg/wyniShWrJ8PZj6QddRA1JfVwPaAbbsAQ+2X00fqwRHFepZ8YN5XBiKulf+i2WIQCQF5FjFEo2LFMAthHvKVaiJR1gKRgG0H2q7ttnlpxswyMM9AljFgEAwkPNKcMLZ5ka9fkx3vIPhR3CO0oXjUbR28ypsM0t649NQIIKKfHiAYT/xodlp1kadHQhAQZShzkpqsHBLz/AeAQwQLXTqGbi0cdXsIP0NMQo5t6nwCadbfM73bB5eP77y7oEr0nGx0yQUfw+6UgcSlnFhQ2LS0C71vTgnXm7bU+QTwKXtp5xnbnvQePTS+446mh255ShUl+B7xQkXpJ0WAcIDGIdJJu2TfzfDAoBbPMsjkCJ4vRUMg5QGBtAcyjwYCJxkEd8jlFt1QQaQDmm7WSjFbXS6qGbszcGzAXocssDdg4yzgm0CyBKn1xNaMPYDgzMxeS/BQwACnIdKGKGrJaQTfI9styogHPe9Px5heQJMUZrMkPuZxwJkBe1UDG2NACgJ26g9MAKCoJBC53EwZDwwM2LYgBuRjtEYRRAxKFvSkQ45L0FtJ4troClxDcLN6D/jYoh70hRReOQj4KTFOqjVMLDZG1AfIB0ak0PsF3PEL8BLKSgSVGcCP602kJSAAPHsBcH0KvXe6ubtU17ALeCqFAdqjufwPa00o753mg4AzSL0s8ZSbuwOiMdVjOI4ooHQDlgIX1xzJ/cLBtDNpS7yd+qTzgD8CfVJ4/0fAY7F40DBhM6TXuIZ8lCgLzAkDJSjzsQTYF//ZKGe1Ijc++frSGTXTG1DWMahEUBN8EIDKWL4Uf0kW8CgwKYVBY/KO67sa+IyGI1cPOAE4G7gKJbRTdbLLgSvRKnEd7jcO5htolSi1+rCKoKXmTcBm93ex+182WufIBfJQerQ55/cWYDKaQdbk+XETEgFrQWQHqrbH0TJAKmJQO+8DTHTAYrSO14yVryufubntwJjEtDhhRVYMjvGwAGuAWcAXLXyxcYsVagUQX7g5rQHc/hucBAjUpi8Nq1AvvquFE2gN2eXmsirpXElmozUsOQAvosX8DV8hiA1uDi82BCI5kPoN16Ob6xE0nDlaUu7eOdnNoUEQ0JTd1j77w2iJeA4wtMm+zRdBI/JFaImtqikQTQMBDdVrR7ld3SpdhhY2g+T7QaQKPbIfR4///XFoPqwY0mjn4Ks6aYu2jlNEnYAxwLloQbMXekkmFSkH9gDr0KrVa8DBmpkJgW8HpW4ek7ZouO3VaMkCx6P5fC5wMup/OqHBZZprV42yjwdRf/Ah6tz+jZLW6hRiYx+1+1qTNifvrsXNMErnpBOvpUeBSqACY6oSfFaCCCwfTHOk9TbsxC2qm6CXmwyqgxXNiYT+j6WWRoqXDOOYWRvodemr7KlIJMGbr/KjDqR4YR5eBhRUZNP39WUhL/2AFzVeZS1b9n2l/b+GYkGvLhG1+JWGPln7ek/pveqRKN7ziCxBy7/p2tomUppfKwkdvEWvLkmVgG96VXiZD3cLF41HDBgZC1yOOqlfAAewpmVkgzEkP7ESJFINoVQCZkMI3yCVgoRMb2tlacS344bnfLIS8dZi/AkoKXANqr3Z7rMTeuYUEGcpj0X9xhGgEK22htHyWTmaFX6JSAXQ0X0X4AvEL8LYrq59KaG0woRZZrj3GeAgxpQj0s2NXwHsBTli/Srwq0xvfH6PzzjBcF7nd9+e3WvVfWhy9IQb8FLgeyiV+RrwHHGywAK/At5Cq8Id0cuVbwJ3ojzAKpSYvhi9FvuGe/6BsTeisdU6NPdPLF9MQQujzwGDEbkNzUnecL8/C1xsO0dLTkzzo0utyNk1mhUvbX6/p0FLDvPRpKYdesugA5qm9qV2nHU8ejGsG+oEe7on3z05KPH2AFrk34x69gHu93eBHmjIc6obsz3Kn/VBLxKMAu5CSYv1aJ7yXWBoaG7h2Ce6ppcN6xEt2T46c/c6N4n3onHS/T/AJ26Sfd0EgHqXk2Pfpc53H5gLrHDa7OrGvBnYhoY0pajXn+UW6Xy32nlopC3ASmCkM7GNaKJVjAauO0NzK6cM8SstlJi3bo2snD6110a6h4sSC9KGeN4ipH4xeQ1wt7Pnjuie6YcSgmucybyCMWWIvAzMRIm/xQ5QNsphveQ0BHCWM9VXgGeA/bbaZH4SNelETfjUuwouOe5b795D1rUbOX7dQ7GJDABOcn9/TGJ+UBtUQ0fMNgcCt8oz0L3QDbgCpXYeQiTTrXoZet/xKmCc67cavUP/KHCLAzYIzY1eAOZakCed+gcDt1SLl82krRyJhnHm9Au0XlGKhtpVDkAm8Rr4MWgYn0wqE/62boxxaOlgmfvtInTfrEf3Sggl7QagJepnXP8oenCMQQ+i19A9e10IvYmTB/wIPV4HoSdCOkqi5blBliLyOsYMd6CygducmXwfteVkoppS/zEVuMQB2AT8E73LG6ONjqCn0GjiHPBbrm0Y3eg9Ub/2odPsGKA6hN4wuM6p9EL09ufYhIkUohzvPIzxgfeBp9Gre+Pdcxg94boQD9tjnJnjlyUNLd6MdsBL3eTCwJ+dCYLuhZ8504tt8iPOKgY6bV7k+rd3ZvugSfDS7VDnd6Yzkyi6J1ajTEbi/akO6Pk+BnWIy92LhjrTWOa02xf4u3tw5jjaLVR/13ct8BdimaGIhzHPoRt+p2v7qevfxX0/HTX7QnSPrDJM3JJsm3puNRq/dyJYEJymUpW67zgBdbq7gDuAU4AlRCPX4tXh1NVMQ4hEMUbvz9T8M9m9XBH9zRdYmRDGT4yVBOq0awI1vqNlk8vtwG9QzXuoA7yAGBW0PDf5HI0FP9pmlE5wiZv2BNRxDkRz+rmI/AljJAiL8j+/rLseDqvcbAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0wMVQwMDoxNjo1NCswMDowMHGd9DoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMDFUMDA6MTY6NTQrMDA6MDAAwEyGAAAAAElFTkSuQmCC'
                            })
                        }
                    },
                    {
                        extend: 'excel',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'print',

                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        },
                        text: 'Imprimir'
                    },
                    {
                        extend: 'copy',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        },
                        text: 'Copiar'
                    }
                ],
                "oLanguage": {
                    "sProcessing": "Processando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                    "sInfoFiltered": "",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"
                    }
                }

                // buttons: [
                //     { extend: 'pdf', className: 'btn-primary' }
                //   ]
            });


            table.buttons().container()
                .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');

        }, 300)
       }

    }
})()