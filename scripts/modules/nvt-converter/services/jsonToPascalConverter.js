var parserApp = angular.module("parserApp");
parserApp.service('converter', function($q, $rootScope, nodeTemplates, pascalBasedTemplates, static, utils) {

  var isEmpty = utils.isEmpty;
  var TAB = static.TAB;
  var NEWLINE = static.NEWLINE;

  var conditionalItemManager = function(tab, items){
        var code = "";
        for(var i=0; i<items.length; i++){
          if(i==0)
          {
            var condition = items[i].enterCondition;
            if(condition == "ELSE"){
              condition = "";
            }

            code = pascalBasedTemplates.getStartOfIfTemplate(tab, "key", condition);
            var item_code = traverse(tab+1, items[i]);
            code = sprintf(code, item_code);
          }
          else if(i==(items.length-1))
          {
            code += pascalBasedTemplates.getElseTemplate(tab);
            var item_code = traverse(tab+1, items[i]);
            code = sprintf(code, item_code);

            code += pascalBasedTemplates.getEndOfIfTemplate(tab, items.length-1);
          }
          else
          {
            var condition = items[i].enterCondition;
            if(condition == "ELSE"){
              condition = "";
            }
            code += pascalBasedTemplates.getElseIfTemplate(tab, "key", condition);
            var item_code = traverse(tab+1, items[i]);
            code = sprintf(code, item_code);
          }
        }
        return code;
  };

  var traverse = function(tab, current_node){

        var code = "";
        var next_code = "";
        var branch_code = "";
        if(isEmpty(current_node)){
          return code;
        }

        switch (current_node.name) {
          case static.NODE_NAME.root:

            code = nodeTemplates.getRootTemplate();
            next_code = traverse(1, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.play:

            var data = current_node.data.type6;
            code = nodeTemplates.getPlayTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.record:

            var data = current_node.data.type6;
            code = nodeTemplates.getRecordTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.getkey:
            var data = current_node.data.type6;
            code = nodeTemplates.getGetKeysTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.dial:

            var data = current_node.data.type6;
            code = nodeTemplates.getDialTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.menu:

            var data = current_node.data.type6;
            code = nodeTemplates.getMenuTemplate(tab, data);

            var conditional_code = "";
            conditional_code = conditionalItemManager(tab+1, current_node.items);

            next_code = traverse(tab, current_node.child);
            code = sprintf(code, conditional_code, next_code);
            break;

          case static.NODE_NAME.repeat:

            var data = current_node.data.type6;
            code = nodeTemplates.getRepeatTemplate(tab, data);

            next_code = traverse(tab+1, current_node.items[0]);
            code = sprintf(code, next_code);

            var tabs = "";
            for(var i=0; i<tab; i++){
              tabs += TAB;
            }
            code += (tabs + "%s\n");

            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);

            break;

          case static.NODE_NAME.hang:

            var data = current_node.data.type6;
            code = nodeTemplates.getHangupTemplate(tab);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.case:

            var data = current_node.data.type6;
            code = nodeTemplates.getCaseTemplate(tab, data);

            next_code = conditionalItemManager(tab, current_node.items)
            code = sprintf(code, next_code);

            var tabs = "";
            for(var i=0; i<tab; i++){
              tabs += "    ";
            }
            code += (tabs + "%s\n");

            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);

            break;

          case static.NODE_NAME.let:

            var data = current_node.data.type6;
            code = nodeTemplates.getLetTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.week:

            var data = current_node.data.type6;
            code = nodeTemplates.getWeekTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.year:

            var data = current_node.data.type6;
            code = nodeTemplates.getYearTemplate(tab, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.do:

            var data = current_node.data.type6;
            code = nodeTemplates.getDoTemplate(tab+1, data);
            next_code = traverse(tab, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.test:

            var data = current_node.data.type6;
            code = nodeTemplates.getTestTemplate(tab, data);

            var tabs = "";
            for(var i=0; i<tab; i++){
              tabs += TAB;
            }

            var nodeForTrue;
            var nodeForFalse;

            if(current_node.items[0].enterCondition){
              nodeForTrue = current_node.items[0];
              nodeForFalse = current_node.items[1];
            }
            else{
              nodeForTrue = current_node.items[1];
              nodeForFalse = current_node.items[0];
            }

            code += (tabs + ("if " + data.expression) + NEWLINE);
            code += (tabs + "%s" + NEWLINE);
            next_code = traverse(tab+1, nodeForTrue);
            code = sprintf(code, next_code);

            code += (tabs + ("else") + NEWLINE);
            code += (tabs + "%s" + NEWLINE);
            next_code = traverse(tab+1, nodeForFalse);
            code = sprintf(code, next_code);

            code += (tabs + ("fi") + NEWLINE);

            code += (tabs + "%s" + NEWLINE);

            next_code = traverse(tab-1, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.return:

            var data = current_node.data.type6;
            code = nodeTemplates.getReturnTemplate(tab);
            next_code = traverse(tab+1, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.exec:

            var data = current_node.data.type6;
            code = nodeTemplates.getExecuteTemplate(tab+1, data);
            next_code = traverse(tab+1, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.break:

            var data = current_node.data.type6;
            code = nodeTemplates.getBreakTemplate(tab);
            next_code = traverse(tab+1, current_node.child);
            code = sprintf(code, next_code);
            break;

          case static.NODE_NAME.sequence:

            var data = current_node.data.type6;
            code = nodeTemplates.getSequenceTemplate(tab+1);

            for(var i=0; i<current_node.items.length; i++){
              next_code += traverse(tab+1, current_node.items[i]);
            }
            code = sprintf(code, next_code);

            next_code = traverse(tab+1, current_node.child);
            code += next_code;
            break;

        }

        return code;
  };



  $rootScope.loop_variable_list = [];
  $rootScope.variable_list = [];

  var generatePascalCode = function(jsonObj){
    var code = traverse(0, jsonObj[0]);

    var variable_inits = "";
    for(var i=0; i<$rootScope.loop_variable_list.length; i++){
      variable_inits += ($rootScope.loop_variable_list[i]);
    }

    for(var i=0; i<$rootScope.variable_list.length; i++){
      variable_inits += ($rootScope.variable_list[i]);
    }

    code = variable_inits + code;
    return code;
  };

  this.convert = function (jsonObj) {
      var deferred = $q.defer();

      var pascal_code = null;
      pascal_code = generatePascalCode(jsonObj);
      if(pascal_code){
        deferred.resolve(pascal_code);
      }

      return deferred.promise;
  };
});
