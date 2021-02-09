var parserApp = angular.module("parserApp");
parserApp.factory('pascalBasedTemplates', function(utils, static) {
     var NEWLINE = static.NEWLINE;
     var SPACE = static.SPACE;
     var TAB = static.TAB;

     var isEmpty = utils.isEmpty;

     return {
       getStartOfIfTemplate: function (tab_count, key, value) {
         var template = NEWLINE;
         var tabs = "";
         var number_of_tab = tab_count;
         while(number_of_tab--){
           tabs += TAB;
         }

         template += (tabs + sprintf("if %s = \"%s\"", key, value) + NEWLINE);
         template += (tabs + TAB + "%s" + NEWLINE);

         return template;
       },

       getEndOfIfTemplate: function (tab_count, count) {
         var template = NEWLINE;
         var tabs = "";
         var number_of_tab = tab_count;
         while(number_of_tab--){
           tabs += TAB;
         }

          var template = tabs;
         for(var i=0; i<count; i++){
           if(i>0){
             template += " ";
           }
           template += "fi";
         }
         template += NEWLINE;
         return template;
       },

       getElseIfTemplate: function (tab_count, key, value) {
         //var template = NEWLINE;
         var template = "";
         var tabs = "";
         var number_of_tab = tab_count;
         while(number_of_tab--){
           tabs += TAB;
         }

         template += (tabs + sprintf("else if %s = \"%s\"", key, value) + NEWLINE);
         template += (tabs + TAB + "%s" + NEWLINE);

         return template;
       },

       getElseTemplate: function (tab_count) {
         //var template = NEWLINE;
         var template = "";
         var tabs = "";
         var number_of_tab = tab_count;
         while(number_of_tab--){
           tabs += TAB;
         }

         template += (tabs + "else" + NEWLINE);
         template += (tabs + TAB + "%s" + NEWLINE);

         return template;
       },

       getWhileTemplate: function (tab_count, type, value) {
         var template = NEWLINE;
         var tabs = "";
         var number_of_tab = tab_count;
         while(number_of_tab--){
           tabs += TAB;
         }

         template += (tabs + "int nvd_brk_1" + NEWLINE);
         if(type == "count"){
           template += (tabs + "int nvd_loop1" + NEWLINE);
         }

         template += (tabs + ("!\"WhileEx\"") + NEWLINE);
         template += (tabs + "nvd_brk_1 = 0" + NEWLINE);

         switch (type) {
              case static.WHILE_TYPES.while:
                  template += (tabs + sprintf("while %d and nvd_brk_1=0", value) + NEWLINE);
                  template += (tabs + TAB + "%s" + NEWLINE);
                  break;

              case static.WHILE_TYPES.count:
                  template += (tabs + "nvd_loop1 = 0" + NEWLINE);
                  template += (tabs + sprintf("while nvd_loop1 < %d and nvd_brk_1=0", value) + NEWLINE);
                  template += (tabs + TAB + "%s" + NEWLINE);
                  template += (tabs + "nvd_loop1=nvd_loop1+1" + NEWLINE);
                  break;

              case static.WHILE_TYPES.endless:
                  template += (tabs + "while nvd_brk_1=0" + NEWLINE);
                  template += (tabs + TAB + "%s" + NEWLINE);
                  break;
          }

          template += (tabs + "wend" + NEWLINE);

          return template;
       }

     };
 });
