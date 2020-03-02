const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {
    return gulp.src([
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
            'node_modules/oclazyload/dist/ocLazyLoad.require.min.js',
            'node_modules/oclazyload/dist/ocLazyLoad.min.js',
            'node_modules/sweetalert/lib/sweet-alert.js',
            'node_modules/angular-sweetalert/SweetAlert.js',
            'node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
            'node_modules/angucomplete-alt/dist/angucomplete-alt.min.js',
            'vertical/assets/js/jquery.min.js',
            'vertical/assets/js/bootstrap.min.js',
            'vertical/assets/js/sidebar-menu.js',
            'vertical/assets/js/jquery.slimscroll.js',
            'vertical/assets/plugins/datatables/jquery.dataTables.min.js',
            'vertical/assets/plugins/datatables/dataTables.bootstrap4.min.js',
            'vertical/assets/plugins/datatables/dataTables.buttons.min.js',
            'vertical/assets/plugins/datatables/buttons.bootstrap4.min.js',
            'vertical/assets/plugins/datatables/jszip.min.js',
            'vertical/assets/plugins/datatables/pdfmake.min.js',
            'vertical/assets/plugins/datatables/vfs_fonts.js',
            'vertical/assets/plugins/select2/select2.min.js',
            'vertical/assets/plugins/datatables/buttons.html5.min.js',
            'vertical/assets/plugins/datatables/buttons.print.min.js',
            'vertical/assets/plugins/datatables/buttons.colVis.min.js',
            'vertical/assets/plugins/datatables/dataTables.responsive.min.js',
            'vertical/assets/plugins/datatables/responsive.bootstrap4.min.js',
            'vertical/assets/plugins/jquery-step/jquery.steps.min.js',
            'vertical/assets/js/init/form-step-init.js',
            'vertical/assets/js/main.js'


        ])
        .pipe(uglify())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('public/assets/js'))
})

gulp.task('deps.css', () => {
    return gulp.src([
            'node_modules/angular-toastr/dist/angular-toastr.min.css',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/sweetalert/lib/sweet-alert.css',
            'node_modules/angucomplete-alt/angucomplete-alt.css',
            'vertical/assets/plugins/datatables/dataTables.bootstrap4.min.css',
            'vertical/assets/plugins/datatables/buttons.bootstrap4.min.css',
            'vertical/assets/plugins/datatables/responsive.bootstrap4.min.css',
            'vertical/assets/css/bootstrap.min.css',
            'vertical/assets/plugins/select2/select2.min.css',
            'vertical/assets/css/icons.css',
            'vertical/assets/css/style.css'
        ])
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(concat('deps.min.css'))
        .pipe(gulp.dest('public/assets/css'))
})

gulp.task('deps.fonts', () => {
    return gulp.src([
            'node_modules/font-awesome/fonts/*.*',
            'vertical/assets/fonts/*'
        ])
        .pipe(gulp.dest('public/assets/fonts'))
})