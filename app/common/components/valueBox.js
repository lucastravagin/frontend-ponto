(function() {
    app.component('valueBox', {
        bindings: {
            textColor: '@',
            value: '@',
            text: '@',
            iconClass: '@',
            colorClass: '@'
        },

        template: `
        <div class="col-md-6 col-lg-6 col-xl-3">
        <div class="card m-b-30">
            <div class="card-body">
                <div class="xp-widget-box">
                    <div class="float-left">
                        <h4 class="xp-counter {{ $ctrl.textColor }}">{{ $ctrl.value }}</h4>
                        <p class="mb-0 font-16 text-muted">{{ $ctrl.text }}</p>
                    </div>
                    <div class="float-right">
                        <div class="xp-widget-icon xp-widget-icon-bg {{ $ctrl.colorClass }}">
                            <i class="mdi mdi-account-multiple font-30 {{ $ctrl.textColor }}"></i>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
        `
    })
})()