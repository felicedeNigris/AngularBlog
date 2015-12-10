angular.module('footerDirective', [])
    .directive('footerbar',function(){

        return{
            templateUrl: '../../views/footer_bar.html',
            restrict: 'E'
            //console.log("FooterBar");
        };
    });