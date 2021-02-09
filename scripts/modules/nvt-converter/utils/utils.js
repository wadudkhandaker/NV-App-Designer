var parserApp = angular.module("parserApp");
parserApp.factory('utils', function(static) {
      return {
        isEmpty : function (value) {
          if(!value || value == null || value == undefined || value=='undefined' || value == ""){
            return true;
          }

          return false;
        },
        saveFile: function(text, filename){
          var head = sprintf(static.NVT_FILE_HEADER, filename, new Date());
          var code =  head + text;
          var pom = document.createElement('a');
          pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
          pom.setAttribute('download', filename);

          if (document.createEvent) {
              var event = document.createEvent('MouseEvents');
              //console.log(event);
              event.initEvent('click', true, true);
              pom.dispatchEvent(event);
          }
          else {
              pom.click();

          }
        }
      }
});
