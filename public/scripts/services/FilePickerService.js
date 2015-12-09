angular.module('FilePicker',[])
  .config(function(filepickerProvider){
    filepickerProvider.setKey('A9TmjAwBGTYSijquSHqRYz');
  })
  .service('FilePicker', function($window){
    return $window.filepicker;
});
