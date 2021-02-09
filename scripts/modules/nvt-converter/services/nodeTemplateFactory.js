var parserApp = angular.module("parserApp");
parserApp.factory('nodeTemplates', function($rootScope, utils, static) {
    var NEWLINE = static.NEWLINE;
    var SPACE = static.SPACE;
    var TAB = static.TAB;

     var isEmpty = utils.isEmpty;

     var getMenuPlayTemplate = function (tabs, data) {
       var filename = "\"" + data.fileName + "\"";
       if(data.ftpVar){
         filename = data.ftpVarSelect;
       }

       var directory = "\"" + data.dirVal + "\"";
       if(data.dirVar){
         directory = data.dirVarSelect;
       }

       var stopOnDtmf = 0;
       if(data.stopOnDtmf){
         stopOnDtmf = 1;
       }

       var template = (tabs + "play ");
       if(isEmpty(filename) == false){
         template += filename;
       }

       if(data.directory || data.dirVar){
         template += (" " + directory);
       }
       template += (" -keys " + stopOnDtmf);

       if(data.playContinueAfterHangup){
         template += " -cont";
       }
       template += NEWLINE;

       return template;
     };

     var getMenuGetTemplate = function (tabs, data) {
       var template = tabs + "getkey ";
       template += (data.variableSelect + " " + data.maxKey);
       template += (" -time " + data.timeoutDuration);
       if(data.keyContinueAfterHangup){
         template += " -cont";
       }
       template += NEWLINE;

       return template;
     };

     return {
        //#1
         getRootTemplate: function(){
           var template = NEWLINE + "{" + NEWLINE;
           template += (TAB + "%s" + NEWLINE);
           template += ("}" + NEWLINE);

           return template;
         },

         //#2
         getMenuTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var nvd_brk_count = 0;
           var nvd_loop_count = 0;
           for(var i=$rootScope.loop_variable_list.length-1; i>=0; i--){
             if($rootScope.loop_variable_list[i].indexOf("nvd_loop")>=0){
               nvd_loop_count = nvd_loop_count + 1;
             }
             else if($rootScope.loop_variable_list[i].indexOf("nvd_brk")>=0){
               nvd_brk_count = nvd_brk_count + 1;
             }
           }

           var repeat__node_number = $rootScope.loop_variable_list.length + 1;
           var nvd_loop_var = "nvd_loop" + (nvd_loop_count + 1);
           var nvd_brk_var = "nvd_brk_" + (nvd_brk_count + 1);

           $rootScope.loop_variable_list.push(("int " + nvd_brk_var + NEWLINE));

           var consoleOutput = "!\"Menu\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           if(data.loop == static.WHILE_TYPES.count){

             $rootScope.loop_variable_list.push(("int " + nvd_loop_var + NEWLINE));

             template += (tabs + (nvd_loop_var + " = 0") + NEWLINE);
             template += (tabs + (nvd_brk_var + " = 0") + NEWLINE);

             template += (tabs + ("while " + nvd_loop_var + " < " + data.loopCount + " and " + nvd_brk_var + "=0") + NEWLINE);

             template += getMenuPlayTemplate(tabs + TAB, data);
             template += getMenuGetTemplate(tabs + TAB, data);
             template += NEWLINE;

             if(data.repeatOnTimeout){
               template += (tabs + TAB + "if Timeout" + NEWLINE)
               template += getMenuPlayTemplate(tabs + TAB + TAB, data);
               template += getMenuGetTemplate(tabs + TAB + TAB, data);
               template += (tabs + TAB + "fi" + NEWLINE);
             }

             template += (tabs + TAB + "%s" + NEWLINE);
             template += (tabs + TAB + (nvd_loop_var + "=" + nvd_loop_var + "+1") + NEWLINE);
             template += (tabs + "wend" + NEWLINE);
           }
           else if(data.loop == static.WHILE_TYPES.while){
             template += (tabs + (nvd_brk_var + " = 0") + NEWLINE);

             template += (tabs + ("while " + data.loopWhile + " and " + nvd_brk_var + "=0") + NEWLINE);

             template += getMenuPlayTemplate(tabs + TAB, data);
             template += getMenuGetTemplate(tabs + TAB, data);
             template += NEWLINE;

             if(data.repeatOnTimeout){
               template += (tabs + TAB + "if Timeout" + NEWLINE)
               template += getMenuPlayTemplate(tabs + TAB + TAB, data);
               template += getMenuGetTemplate(tabs + TAB + TAB, data);
               template += (tabs + TAB + "fi" + NEWLINE);
             }

             template += (tabs + TAB + "%s" + NEWLINE);
             template += (tabs + "wend" + NEWLINE);
           }
           else if(data.loop == static.WHILE_TYPES.endless){
             template += (tabs + (nvd_brk_var + " = 0") + NEWLINE);

             template += (tabs + ("while " + nvd_brk_var + "=0") + NEWLINE);

             template += getMenuPlayTemplate(tabs + TAB, data);
             template += getMenuGetTemplate(tabs + TAB, data);
             template += NEWLINE;

             if(data.repeatOnTimeout){
               template += (tabs + TAB + "if Timeout" + NEWLINE)
               template += getMenuPlayTemplate(tabs + TAB + TAB, data);
               template += getMenuGetTemplate(tabs + TAB + TAB, data);
               template += (tabs + TAB + "fi" + NEWLINE);
             }

             template += (tabs + TAB + "%s" + NEWLINE);
             template += (tabs + "wend" + NEWLINE);
           }
           else{ // once
             template += getMenuPlayTemplate(tabs, data);
             template += getMenuGetTemplate(tabs, data);
             template += (tabs + TAB + "%s" + NEWLINE);
           }


           template += (tabs + "%s");

           return template;
         },

         //#3 data.fileName, data.directoryPath, data.partNumber
         getPlayTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Play file\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           template += (tabs + "play ");

           var file_name = "\"" + data.fileName + "\"";
           if(data.ftpVar){
             file_name = data.ftpVarSelect;
           }
           template += file_name;

           var dir_name = "\"" + data.directoryPath + "\"";
           if(data.dirVar){
             dir_name = data.dirVarSelect;
           }

           if(data.directory || data.dirVar){
             template += (" " + dir_name);
           }

           var stopOnDtmf = (data.stopOnDtmf == true ? 1 : 0);
           template += (" -keys " + stopOnDtmf)

           if(data.continueAfterHangup){
             template += " -cont";
           }
           template += NEWLINE;

           template += (tabs + "%s");
           return template;
         },

         //#4data.fileName, data.directoryPath, 1
         getRecordTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Record file\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);
           template += (tabs + "rec ")

           var file_name = "\"" + data.fileName + "\"";
           if(data.riVar){
             file_name = data.riVarSelect;
           }
           template += file_name;

           var dir_name = "\"" + data.dirVal + "\"";
           if(data.dirVar){
             dir_name = data.dirVarSelect;
           }
           template += (" " + dir_name);


           var stopOnDtmf = (data.stopOnDtmf == true ? 1 : 0)
           template += (" -keys " + stopOnDtmf);

           if(data.timeout){
             template += (" -time " + data.timeoutDuration);
           }
           else{
             template += " -time 30";
           }

           if(data.continueAfterHangup){
             template += " -cont";
           }
           template += NEWLINE;

           template += (tabs + "%s" + NEWLINE);
           return template;
         },

         //#5
         getGetKeysTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Get key\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }

           var max_keys = data.maxKey;
           var variable = data.variable;

           template += (tabs + consoleOutput + NEWLINE);
           template += (tabs + "getkey");

           if(isEmpty(variable) == false){
             template += (" " + variable + " " + max_keys);
           }

           if(data.timeout){
             template += (" -time " + data.timeoutDuration);
           }
           else{
             template += " -time 30";
           }

           if(data.continueAfterHangup){
             template += (" -cont");
           }

           template += NEWLINE;

           template += (tabs + "%s" + NEWLINE);
           return template;
         },

         //#6data.dial, data.maxRingVal
         getDialTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Dial\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }

           var dial = "";
           if(data.variable){
             dial = data.variableVar.variable
           }
           else{
             dial = data.dial;
           }



           template += (tabs + "offhook" + NEWLINE);
           template += (tabs + consoleOutput + NEWLINE);
           template += (tabs + sprintf("dial \"%s\"", dial));

           if(data.maxRing){
             template += (" -rings " + data.maxRingVal + NEWLINE);
           }

           template += (tabs + "%s");
           return template;
         },

         //#7
         getHangupTemplate: function (tab_count) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           template += (tabs + "hangup" + NEWLINE);
           return template;
         },

         //#8
         getCaseTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Case\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }

           template += (tabs + consoleOutput + NEWLINE);
           template += (tabs + "%s" + NEWLINE);
           return template;
         },

         //#9
         getLetTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var key = "";
           if(data.variable == 'module'){
             key = data.variableModVar;
           }
           else{
             key = data.variableSysVar;
             $rootScope.variable_list.push("str " + key);
           }

           template += (tabs + sprintf("%s = %s", key, data.expression) + NEWLINE);

           template += (tabs + "%s");
           return template;
         },

         //#10
         getTestTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }


           var consoleOutput = "!\"Test\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           //template += (tabs + "%s" + NEWLINE);
           return template;
         },

         //#11
         getWeekTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Check week\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           template += (tabs + "checkweek ");
           if(data.variable){
             template += data.variableSelect;
           }
           else{
             template += sprintf("\"%s\"", data.checkFile);
           }

           if(data.action){
             template += sprintf(" %s", data.actionSelect);
           }

           template += NEWLINE;

           template += (tabs + "%s");
           return template;
         },

         //#12
         getYearTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var consoleOutput = "!\"Check week\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           template += (tabs + "checkschedule ");

           if(data.variable){
             template += data.variableSelect;
           }
           else{
             template += sprintf("\"%s\"", data.checkFile);
           }

           if(data.action){
             template += sprintf(" %s", data.actionSelect);
           }

           template += NEWLINE;

           template += (tabs + "%s" + NEWLINE);
           return template;
         },

         //#13
         getDoTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var program_name = data.doFileName;

           var consoleOutput = "!\"Module call: \"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           if(data.variable){
             program_name = data.doVariable;
           }

           template += (tabs + sprintf("do \"%s\"", program_name) + NEWLINE);

           template += (tabs + "%s");
           return template;
         },

         //#14
         getReturnTemplate: function (tab_count) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           template += (tabs + "return" + NEWLINE);
           template += (tabs + "%s");
           return template;
         },

         //#15
         getExecuteTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var program_name = data.command;

           //template += (tabs + "!\"Exec\"" + NEWLINE);
           var consoleOutput = "!\"Exec\"";
           if(isEmpty(data.consoleOutput) == false){
             consoleOutput = "!\"" + data.consoleOutput + "\"";
           }
           template += (tabs + consoleOutput + NEWLINE);

           if(data.variable){
             program_name = data.variableVar;
           }

           template += (tabs + sprintf("run \"%s\"", program_name) + NEWLINE);

           template += (tabs + "%s");
           return template;
         },

         //#16
         getRepeatTemplate: function (tab_count, data) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var type = data.looptype;
           var value = data.count;

           var repeat__node_number = $rootScope.loop_variable_list.length + 1;
           var nvd_loop_var = "nvd_loop" + repeat__node_number;
           var nvd_brk_var = "nvd_brk_" + repeat__node_number;

           $rootScope.loop_variable_list.push(("int " + nvd_brk_var + NEWLINE));

           template += (NEWLINE + tabs + "!\"WhileEx\"" + NEWLINE);
           template += (tabs + (nvd_brk_var + " = 0") + NEWLINE);

           if(type == static.WHILE_TYPES.count){
             $rootScope.loop_variable_list.push(("int " + nvd_loop_var + NEWLINE));

             value = data.count;

             template += (tabs + (nvd_loop_var + " = 0") + NEWLINE);

             template += (NEWLINE + tabs + ("while " + nvd_loop_var + " < " + value + " and " + nvd_brk_var + "=0") + NEWLINE);
             template += (tabs + TAB + (nvd_loop_var + "=" + nvd_loop_var + "+1") + NEWLINE);

           }
           else if(type == static.WHILE_TYPES.while){

             value = data.whileCondition;
             template += (NEWLINE + tabs + ("while " + value + " and " + nvd_brk_var + "=0") + NEWLINE);
           }
           else{
             template += (NEWLINE + tabs + ("while " + nvd_brk_var + "=0") + NEWLINE);
           }

           template += (tabs + TAB + "%s" + NEWLINE);
           template += (tabs + "wend" + NEWLINE);

           return template;
         },

         //#17
         getBreakTemplate: function (tab_count) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           var repeat__node_number = 0;
           for(var i=$rootScope.loop_variable_list.length-1; i>=0; i--){
             if($rootScope.loop_variable_list[i].indexOf("nvd_brk_")>=0){
               repeat__node_number = repeat__node_number + 1;
             }
           }
           if(repeat__node_number == 0){
             repeat__node_number = repeat__node_number + 1;
           }
           var nvd_brk_var = "nvd_brk_" + repeat__node_number;

           template += (tabs + (nvd_brk_var + " = 1      /* break */") + NEWLINE);
           return template;
         },

         //#18
         getSequenceTemplate: function (tab_count) {
           var template = NEWLINE;
           var tabs = "";
           var number_of_tab = tab_count;
           while(number_of_tab--){
             tabs += TAB;
           }

           template += (tabs + "/* Start of block */" + NEWLINE);
           template += (tabs + "%s" + NEWLINE);
           template += (tabs + "/* End of block */" + NEWLINE);

           return template;
         }

     };
 });
