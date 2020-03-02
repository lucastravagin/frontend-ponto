(function () {
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            function carregaJquery() {
                angular.element(document).ready(function () {

                    setTimeout(function () {
                        var current_fs, next_fs, previous_fs; //fieldsets
                        var opacity;
                        var current = 1;
                        var steps = $("fieldset").length;

                        setProgressBar(current);

                        $(".next").click(function () {

                            current_fs = $(this).parent();
                            next_fs = $(this).parent().next();

                            //Add Class Active
                            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

                            //show the next fieldset
                            next_fs.show();
                            //hide the current fieldset with style
                            current_fs.animate({ opacity: 0 }, {
                                step: function (now) {
                                    // for making fielset appear animation
                                    opacity = 1 - now;

                                    current_fs.css({
                                        'display': 'none',
                                        'position': 'relative'
                                    });
                                    next_fs.css({ 'opacity': opacity });
                                },
                                duration: 500
                            });
                            setProgressBar(++current);
                        });

                        $(".previous").click(function () {

                            current_fs = $(this).parent();
                            previous_fs = $(this).parent().prev();

                            //Remove class active
                            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                            //show the previous fieldset
                            previous_fs.show();

                            //hide the current fieldset with style
                            current_fs.animate({ opacity: 0 }, {
                                step: function (now) {
                                    // for making fielset appear animation
                                    opacity = 1 - now;

                                    current_fs.css({
                                        'display': 'none',
                                        'position': 'relative'
                                    });
                                    previous_fs.css({ 'opacity': opacity });
                                },
                                duration: 500
                            });
                            setProgressBar(--current);
                        });

                        function setProgressBar(curStep) {
                            var percent = parseFloat(100 / steps) * curStep;
                            percent = percent.toFixed();
                            $(".progress-bar")
                                .css("width", percent + "%")
                        }

                        $(".submit").click(function () {
                            return false;
                        })


                    }, 2000)

                });
            }
            $stateProvider.state('dashboard', {
                url: "/dashboard",
                templateUrl: "dashboard/dashboard.html",
                controller: function () {
                    setTimeout(() => {
                        document.getElementById('contador-li').classList.remove('active')
                        document.getElementById('empresa-li').classList.remove('active')
                        document.getElementById('colaborador-li').classList.remove('active')
                        document.getElementById('relatorio-li').classList.remove('active')
                        document.getElementById('dashboard-li').classList.toggle('active');
                        carregaJquery()
                    }, 500)

                }
            }).state('relatorio', {
                url: "/relatorio",
                templateUrl: "relatorio/tabs.html",
                controller: function () {
                    setTimeout(() => {
                        document.getElementById('contador-li').classList.remove('active')
                        document.getElementById('empresa-li').classList.remove('active')
                        document.getElementById('colaborador-li').classList.remove('active')
                        document.getElementById('dashboard-li').classList.remove('active');
                        document.getElementById('relatorio-li').classList.toggle('active')
                        carregaJquery()
                    }, 500)

                }
            }).state('empresa', {
                url: "/empresa",
                templateUrl: "empresa/tabs.html",
                controller: function () {
                    document.getElementById('contador-li').classList.remove('active')
                    document.getElementById('empresa-li').classList.toggle('active')
                    document.getElementById('colaborador-li').classList.remove('active')
                    document.getElementById('dashboard-li').classList.remove('active');
                    document.getElementById('relatorio-li').classList.remove('active')
                    carregaJquery()
                }
            })
                .state('colaborador', {
                    url: "/colaborador",
                    templateUrl: "colaborador/tabs.html",
                    controller: function () {
                        document.getElementById('contador-li').classList.remove('active')
                        document.getElementById('empresa-li').classList.remove('active')
                        document.getElementById('colaborador-li').classList.toggle('active')
                        document.getElementById('dashboard-li').classList.remove('active');
                        document.getElementById('relatorio-li').classList.remove('active')
                        carregaJquery()
                    }
                })
                .state('contador', {
                    url: "/contador",
                    templateUrl: "contador/tabs.html",
                    controller: function () {
                        document.getElementById('contador-li').classList.toggle('active')
                        document.getElementById('empresa-li').classList.remove('active')
                        document.getElementById('colaborador-li').classList.remove('active')
                        document.getElementById('dashboard-li').classList.remove('active');
                        document.getElementById('relatorio-li').classList.remove('active')
                    }
                })


            $urlRouterProvider.otherwise('/dashboard')
        }
    ]).run([
        '$rootScope',
        '$http',
        '$location',
        '$window',
        'auth',
        '$ocLazyLoad',
        function ($rootScope, $http, $location, $window, auth, $ocLazyLoad) {
            validateUser()
            $rootScope.$on('$locationChangeStart', () => validateUser())
            
           
            function validateUser() {
                const user = auth.getUser()
                const authPage = '/auth.html'
                const isAuthPage = $window.location.href.includes(authPage)

                if (!user && !isAuthPage) {
                    $window.location.href = authPage
                } else if (user && !user.isValid) {
                    auth.validateToken(user.token, (err, valid) => {
                        if (!valid) {
                            $window.location.href = authPage
                        } else {
                            user.isValid = true
                            $http.defaults.headers.common.Authorization = user.token
                            isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
                        }
                    })
                }
            }
        }
    ])
})()