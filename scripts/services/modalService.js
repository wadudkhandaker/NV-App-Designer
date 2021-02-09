app.factory("modalService", ['$uibModal','$q', function ($uibModal,$q) {
    return {
        playModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/play-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {

                    //console.log('test');
                    $scope.node = node;
                    $scope.playFTPVarList = [];
                    $scope.playDirVarList = [];

                    /* file */
                    $scope.addNewEntryForPlayFile = {};
                    $scope.enableNewVarEntryButtonForPlayFile = true;
                    $scope.showNewVarEntryBlockForPlayFile = false;
                    /* file */

                    /* directory */
                    $scope.addNewEntryForDir = {};
                    $scope.enableNewVarEntryButtonForDir = true;
                    $scope.showNewVarEntryBlockForDir = false;
                    /* directory */

                    /* file */
                    $scope.checkNewVarEntryForPlayFile = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForPlayFile = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForPlayFile.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForPlayFile = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForPlayFile = function(){
                        $scope.showNewVarEntryBlockForPlayFile = true;
                    };

                    $scope.hideNewVarEntrySectionForPlayFile = function(){
                        $scope.addNewEntryForPlayFile = {};
                        $scope.showNewVarEntryBlockForPlayFile = false;
                    };

                    $scope.addNewVarEntryForPlayFile = function(res){
                        //res.playFileToPlay = 1;
                        $scope.playFTPVarList.push(res.variable);

                        $scope.addNewEntryForPlayFile = {};
                        $scope.showNewVarEntryBlockForPlayFile = false;
                    };
                    /* file */

                    /* directory */
                    $scope.checkNewVarEntryForDir = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForDir = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForDir.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForDir = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForDir = function(){
                        $scope.showNewVarEntryBlockForDir = true;
                    }

                    $scope.hideNewVarEntrySectionForDir = function(){
                        $scope.addNewEntryForDir = {};
                        $scope.showNewVarEntryBlockForDir = false;
                    }

                    $scope.addNewVarEntryForDir = function(res){
                        //res.playDirectory = 1;
                        $scope.playDirVarList.push(res.variable);

                        $scope.addNewEntryForDir = {};
                        $scope.showNewVarEntryBlockForDir = false;
                    }
                    /* directory */

                    $scope.getVariable = function () {
                        VariableService.getPlayFTPVariables().then(function (promise) {
                            $scope.playFTPVarList = promise;
                        });

                        VariableService.getPlayDirectoryVariables().then(function (res) {
                            $scope.playDirVarList = res;
                        });
                    };
                    $scope.getVariable();

                    $scope.getFileName = function (file) {
                        $scope.node.data.type6.fileName = file.name;
                    };

                    $scope.dirCheck = function(res){
                        $scope.node.data.type6.dirVar = false;
                    }

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                size: size,
                animation: true
            });
            //modalInstance.result.then(callback);
        },

        getKeyModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/get-key-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.getKeyVarList = [];

                    /* variable */
                    $scope.addNewEntry = {};
                    $scope.enableNewVarEntryButton = true;
                    $scope.showNewVarEntryBlock = false;
                    
                    $scope.checkNewVarEntry = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButton = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntry.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButton = true;
                        }
                    };

                    $scope.showNewVarEntrySection = function(){
                        $scope.showNewVarEntryBlock = true;
                    };

                    $scope.hideNewVarEntrySection = function(){
                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };

                    $scope.addNewVarEntry = function(res){
                        //res.getKey = 1;
                        $scope.getKeyVarList.push(res.variable);

                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };
                    /* variable */

                    $scope.getVariable = function () {
                        VariableService.getGetKeyVariables().then(function (promise) {
                            $scope.getKeyVarList = promise;

                            if($scope.node.data.type6.variable == ""){
                                $scope.node.data.type6.variable = $scope.getKeyVarList[0];
                            }
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],

                size: size,
                animation: true
            });
        },

        dialModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/dial-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.dialVarList = [];

                    /* variable */
                    $scope.addNewEntry = {};
                    $scope.enableNewVarEntryButton = true;
                    $scope.showNewVarEntryBlock = false;
                    
                    $scope.checkNewVarEntry = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButton = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntry.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButton = true;
                        }
                    };

                    $scope.showNewVarEntrySection = function(){
                        $scope.showNewVarEntryBlock = true;
                    };

                    $scope.hideNewVarEntrySection = function(){
                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };

                    $scope.addNewVarEntry = function(res){
                        //res.dial = 1;
                        $scope.dialVarList.push(res.variable);

                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };
                    /* variable */

                    $scope.getVariable = function () {
                        VariableService.getDialVariables().then(function (promise) {
                            $scope.dialVarList = promise;
                            
                            if($scope.node.data.type6.variableVar == ""){
                                $scope.node.data.type6.variableVar = $scope.dialVarList[1];
                            }                 
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        letModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/let-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.letModVarList = [];
                    $scope.letSysVarList = [];

                    /*
                    $scope.addNewEntry = [];
                    $scope.variableModVarEntry = "";
                    $scope.showVariableModVarEntryBlock = false;
                    $scope.showVariableModVarEntryButtonVisibilityCondition = true;
                    */

                    /* module */
                    $scope.addNewEntryForModule = {};
                    $scope.enableNewVarEntryButtonForModule = true;
                    $scope.showNewVarEntryBlockForModule = false;
                    /* module */

                    /* system */
                    $scope.addNewEntryForSystem = {};
                    $scope.enableNewVarEntryButtonForSystem = true;
                    $scope.showNewVarEntryBlockForSystem = false;
                    /* system */

                    /* module */
                    /*
                    $scope.checkNewVarEntryForModule = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForModule = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForModule.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForModule = true;
                        }
                    };
                    */

                    $scope.showNewVarEntrySectionForModule = function(){
                        $scope.showNewVarEntryBlockForModule = true;
                    };

                    $scope.hideNewVarEntrySectionForModule = function(){
                        $scope.addNewEntryForModule = {};
                        $scope.showNewVarEntryBlockForModule = false;
                    };

                    $scope.addNewVarEntryForModule = function(res){
                        //res.letModule = 1;
                        $scope.letModVarList.push(res.variable);

                        $scope.addNewEntryForModule = {};
                        $scope.showNewVarEntryBlockForModule = false;
                    };
                    /* module */

                    /* system */
                    $scope.checkNewVarEntryForSystem = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForSystem = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForSystem.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForSystem = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForSystem = function(){
                        $scope.showNewVarEntryBlockForSystem = true;
                    }

                    $scope.hideNewVarEntrySectionForSystem = function(){
                        $scope.addNewEntryForSystem = {};
                        $scope.showNewVarEntryBlockForSystem = false;
                    }

                    $scope.addNewVarEntryForSystem = function(res){
                        //res.letSystem = 1;
                        $scope.letSysVarList.push(res.variable);

                        $scope.addNewEntryForSystem = {};
                        $scope.showNewVarEntryBlockForSystem = false;
                    }
                    /* system */

                    $scope.getVariable = function () {
                        VariableService.getLetModuleVariables().then(function (promise) {
                            if(promise.length > 0){
                                $scope.letModVarList = promise;
                            }
                        });

                        VariableService.getLetSystemVariables().then(function (res) {
                            $scope.letSysVarList = res;
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        if($scope.node.data.type6.variable == 'module'){
                            $scope.node.data.type6.variableSysVar = "";
                        }

                        if($scope.node.data.type6.variable == 'system'){
                            $scope.node.data.type6.variableModVar = "";
                        }

                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    /*
                    $scope.showVariableModVarEntry = function(res){
                        if(res != null || res != "" || res != undefined){
                            $scope.addNewEntryForModule.variable = res;
                        }

                        $scope.showNewVarEntryBlockForModule = true;
                    }

                    $scope.hideVariableModVarEntry = function(){
                        $scope.addNewEntryForModule = [];
                        $scope.variableModVarEntry = "";
                        $scope.showNewVarEntryBlockForModule = false;
                    }

                    $scope.addVariableModVarEntry = function(res){
                        res.letModule = 1;
                        $scope.letModVarList.push(res);

                        $scope.addNewEntryForModule = [];
                        $scope.variableModVarEntry = "";
                        $scope.showNewVarEntryBlockForModule = false;
                    }

                    $scope.showVariableModVarEntryButtonVisibility = function(res){
                        if(res > 0){
                            $scope.showVariableModVarEntryButtonVisibilityCondition = false;
                        } else{
                            $scope.showVariableModVarEntryButtonVisibilityCondition = true;
                        } 
                    }
                    */
                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        menuModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/menu-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.menuFTPVarList = [];
                    $scope.menuGetKeyVarList = [];

                    /* file */
                    $scope.addNewEntryForPlayFile = {};
                    $scope.enableNewVarEntryButtonForPlayFile = true;
                    $scope.showNewVarEntryBlockForPlayFile = false;
                    /* file */

                    /* directory */
                    $scope.addNewEntryForDir = {};
                    $scope.enableNewVarEntryButtonForDir = true;
                    $scope.showNewVarEntryBlockForDir = false;
                    /* directory */

                    /* variable */
                    $scope.addNewEntry = {};
                    $scope.enableNewVarEntryButton = true;
                    $scope.showNewVarEntryBlock = false;
                    /* variable */

                    /* file */
                    $scope.checkNewVarEntryForPlayFile = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForPlayFile = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForPlayFile.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForPlayFile = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForPlayFile = function(){
                        $scope.showNewVarEntryBlockForPlayFile = true;
                    };

                    $scope.hideNewVarEntrySectionForPlayFile = function(){
                        $scope.addNewEntryForPlayFile = {};
                        $scope.showNewVarEntryBlockForPlayFile = false;
                    };

                    $scope.addNewVarEntryForPlayFile = function(res){
                        //res.menuFileToPlay = 1;
                        $scope.menuFTPVarList.push(res.variable);

                        $scope.addNewEntryForPlayFile = {};
                        $scope.showNewVarEntryBlockForPlayFile = false;
                    };
                    /* file */

                    /* directory */
                    $scope.checkNewVarEntryForDir = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForDir = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForDir.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForDir = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForDir = function(){
                        $scope.showNewVarEntryBlockForDir = true;
                    }

                    $scope.hideNewVarEntrySectionForDir = function(){
                        $scope.addNewEntryForDir = {};
                        $scope.showNewVarEntryBlockForDir = false;
                    }

                    $scope.addNewVarEntryForDir = function(res){
                        //res.menuFileToPlay = 1;
                        $scope.menuFTPVarList.push(res.variable);

                        $scope.addNewEntryForDir = {};
                        $scope.showNewVarEntryBlockForDir = false;
                    }
                    /* directory */

                    /* variable */
                    $scope.checkNewVarEntry = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButton = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntry.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButton = true;
                        }
                    };

                    $scope.showNewVarEntrySection = function(){
                        $scope.showNewVarEntryBlock = true;
                    };

                    $scope.hideNewVarEntrySection = function(){
                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };

                    $scope.addNewVarEntry = function(res){
                        //res.menuGetKey = 1;
                        $scope.menuGetKeyVarList.push(res.variable);

                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };
                    /* variable */

                    $scope.getVariable = function () {
                        VariableService.getMenuFTPVariables().then(function (promise) {
                            $scope.menuFTPVarList = promise;
                        });

                        VariableService.getMenuGetKeyVariables().then(function (res) {
                            $scope.menuGetKeyVarList = res;

                            if($scope.node.data.type6.variableSelect == ""){
                                $scope.node.data.type6.variableSelect = $scope.menuGetKeyVarList[0];
                            }
                        });
                    };
                    $scope.getVariable();

                    $scope.dirCheck = function(res){
                        $scope.node.data.type6.dirVar = false;
                    }

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],

                size: size,
                animation: true
            });
        },

        weekModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/week-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.weekFileVarList = [];
                    $scope.weekActionVarList = [];

                    /* file */
                    $scope.addNewEntryForCheckFile = {};
                    $scope.enableNewVarEntryButtonForCheckFile = true;
                    $scope.showNewVarEntryBlockForCheckFile = false;
                    /* file */

                    /* directory */
                    $scope.addNewEntryForAction = {};
                    $scope.enableNewVarEntryButtonForAction = true;
                    $scope.showNewVarEntryBlockForAction = false;
                    /* directory */

                    /* file */
                    $scope.checkNewVarEntryForCheckFile = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForCheckFile = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForCheckFile.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForCheckFile = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForCheckFile = function(){
                        $scope.showNewVarEntryBlockForCheckFile = true;
                    };

                    $scope.hideNewVarEntrySectionForCheckFile = function(){
                        $scope.addNewEntryForCheckFile = {};
                        $scope.showNewVarEntryBlockForCheckFile = false;
                    };

                    $scope.addNewVarEntryForCheckFile = function(res){
                        //res.checkWeekCheckFile = 1;
                        $scope.weekFileVarList.push(res.variable);

                        $scope.addNewEntryForCheckFile = {};
                        $scope.showNewVarEntryBlockForCheckFile = false;
                    };
                    /* file */

                    /* directory */
                    $scope.checkNewVarEntryForAction = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForAction = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForAction.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForAction = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForAction = function(){
                        $scope.showNewVarEntryBlockForAction = true;
                    }

                    $scope.hideNewVarEntrySectionForAction = function(){
                        $scope.addNewEntryForAction = {};
                        $scope.showNewVarEntryBlockForAction = false;
                    }

                    $scope.addNewVarEntryForAction = function(res){
                        //res.checkWeekAction = 1;
                        $scope.weekActionVarList.push(res.variable);

                        $scope.addNewEntryForAction = {};
                        $scope.showNewVarEntryBlockForAction = false;
                    }
                    /* directory */

                    $scope.getVariable = function () {
                        VariableService.getCheckWeekCheckFileVariables().then(function (promise) {
                            $scope.weekFileVarList = promise;
                        });

                        VariableService.getCheckWeekActionVariables().then(function (res) {
                            $scope.weekActionVarList = res;
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        yearModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/year-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.yearFileVarList = [];
                    $scope.yearActionVarList = [];

                    /* file */
                    $scope.addNewEntryForCheckFile = {};
                    $scope.enableNewVarEntryButtonForCheckFile = true;
                    $scope.showNewVarEntryBlockForCheckFile = false;
                    /* file */

                    /* directory */
                    $scope.addNewEntryForAction = {};
                    $scope.enableNewVarEntryButtonForAction = true;
                    $scope.showNewVarEntryBlockForAction = false;
                    /* directory */

                    /* file */
                    $scope.checkNewVarEntryForCheckFile = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForCheckFile = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForCheckFile.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForCheckFile = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForCheckFile = function(){
                        $scope.showNewVarEntryBlockForCheckFile = true;
                    };

                    $scope.hideNewVarEntrySectionForCheckFile = function(){
                        $scope.addNewEntryForCheckFile = {};
                        $scope.showNewVarEntryBlockForCheckFile = false;
                    };

                    $scope.addNewVarEntryForCheckFile = function(res){
                        //res.checkYearCheckFile = 1;
                        $scope.yearFileVarList.push(res.variable);

                        $scope.addNewEntryForCheckFile = {};
                        $scope.showNewVarEntryBlockForCheckFile = false;
                    };
                    /* file */

                    /* directory */
                    $scope.checkNewVarEntryForAction = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForAction = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForAction.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForAction = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForAction = function(){
                        $scope.showNewVarEntryBlockForAction = true;
                    }

                    $scope.hideNewVarEntrySectionForAction = function(){
                        $scope.addNewEntryForAction = {};
                        $scope.showNewVarEntryBlockForAction = false;
                    }

                    $scope.addNewVarEntryForAction = function(res){
                        //res.checkYearAction = 1;
                        $scope.yearActionVarList.push(res.variable);

                        $scope.addNewEntryForAction = {};
                        $scope.showNewVarEntryBlockForAction = false;
                    }
                    /* directory */

                    $scope.getVariable = function () {
                        VariableService.getCheckYearCheckFileVariables().then(function (promise) {
                            $scope.yearFileVarList = promise;
                        });

                        VariableService.getCheckYearActionVariables().then(function (res) {
                            $scope.yearActionVarList = res;
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        caseModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/case-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.caseVarList = [];

                    /* variable */
                    $scope.addNewEntry = {};
                    $scope.enableNewVarEntryButton = true;
                    $scope.showNewVarEntryBlock = false;
                    
                    $scope.checkNewVarEntry = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButton = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntry.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButton = true;
                        }
                    };

                    $scope.showNewVarEntrySection = function(){
                        $scope.showNewVarEntryBlock = true;
                    };

                    $scope.hideNewVarEntrySection = function(){
                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };

                    $scope.addNewVarEntry = function(res){
                        //res.case = 1;
                        $scope.caseVarList.push(res.variable);

                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };
                    /* variable */

                    $scope.getVariable = function () {
                        VariableService.getCaseVariables().then(function (promise) {
                            $scope.caseVarList = promise;
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        testModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/test-modal.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    $scope.node = node;

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        execModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/exec-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {
                    $scope.node = node;
                    $scope.execVarList = [];

                    /* variable */
                    $scope.addNewEntry = {};
                    $scope.enableNewVarEntryButton = true;
                    $scope.showNewVarEntryBlock = false;
                    
                    $scope.checkNewVarEntry = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButton = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntry.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButton = true;
                        }
                    };

                    $scope.showNewVarEntrySection = function(){
                        $scope.showNewVarEntryBlock = true;
                    };

                    $scope.hideNewVarEntrySection = function(){
                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };

                    $scope.addNewVarEntry = function(res){
                        //res.execVariable = 1;
                        $scope.execVarList.push(res.variable);

                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };
                    /* variable */

                    $scope.getVariable = function () {
                        VariableService.getExecVariableVariables().then(function (promise) {
                            $scope.execVarList = promise;
                        });
                    };
                    $scope.getVariable();

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        recordModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/record-modal.html',
                controller: ['$scope', '$uibModalInstance', 'VariableService', function ($scope, $uibModalInstance, VariableService) {

                    //console.log('test');
                    $scope.node = node;
                    $scope.recFileVarList = [];
                    $scope.recDirVarList = [];

                    /* file */
                    $scope.addNewEntryForRecord = {};
                    $scope.enableNewVarEntryButtonForRecord = true;
                    $scope.showNewVarEntryBlockForRecord = false;
                    /* file */

                    /* directory */
                    $scope.addNewEntryForDir = {};
                    $scope.enableNewVarEntryButtonForDir = true;
                    $scope.showNewVarEntryBlockForDir = false;
                    /* directory */

                    /* file */
                    $scope.checkNewVarEntryForRecord = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForRecord = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForRecord.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForRecord = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForRecord = function(){
                        $scope.showNewVarEntryBlockForRecord = true;
                    };

                    $scope.hideNewVarEntrySectionForRecord = function(){
                        $scope.addNewEntryForRecord = {};
                        $scope.showNewVarEntryBlockForRecord = false;
                    };

                    $scope.addNewVarEntryForRecord = function(res){
                        //res.recordFile = 1;
                        $scope.recFileVarList.push(res.variable);

                        $scope.addNewEntryForRecord = {};
                        $scope.showNewVarEntryBlockForRecord = false;
                    };
                    /* file */

                    /* directory */
                    $scope.checkNewVarEntryForDir = function(res, result){
                        if(res == 0){
                            $scope.enableNewVarEntryButtonForDir = false;

                            if(result != null || result != "" || result != undefined){
                                $scope.addNewEntryForDir.variable = result;
                            }

                            //alert("Variable does not exist. Click add button to add a new variable.");
                        } else{
                            $scope.enableNewVarEntryButtonForDir = true;
                        }
                    };

                    $scope.showNewVarEntrySectionForDir = function(){
                        $scope.showNewVarEntryBlockForDir = true;
                    }

                    $scope.hideNewVarEntrySectionForDir = function(){
                        $scope.addNewEntryForDir = {};
                        $scope.showNewVarEntryBlockForDir = false;
                    }

                    $scope.addNewVarEntryForDir = function(res){
                        //res.recordDirectory = 1;
                        $scope.recDirVarList.push(res.variable);

                        $scope.addNewEntryForDir = {};
                        $scope.showNewVarEntryBlockForDir = false;
                    }
                    /* directory */

                    $scope.getVariable = function () {
                        VariableService.getRecordFileVariables().then(function (promise) {
                            $scope.recFileVarList = promise;
                        });

                        VariableService.getRecordDirectoryVariables().then(function (res) {
                            $scope.recDirVarList = res;
                        });
                    };
                    $scope.getVariable();

                    $scope.getFileName = function (file) {
                        $scope.node.data.type6.fileName = file.name;
                    };

                    $scope.dirCheck = function(res){
                        $scope.node.data.type6.dirVar = false;
                    }

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],
                size: size,
                animation: true
            });
            //modalInstance.result.then(callback);
        },

        repeatModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/repeat-modal.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

                    //console.log('test');
                    $scope.node = node;

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],
                size: size,
                animation: true
            });
        },

        doModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/do-modal.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    console.log(node);
                    //console.log('test');
                    $scope.node = node;
                    $scope.doVarList = [];

                    /* variable */
                    $scope.addNewEntry = {};
                    //$scope.enableNewVarEntryButton = true;
                    $scope.showNewVarEntryBlock = false;
                    
                    $scope.showNewVarEntrySection = function(){
                        $scope.showNewVarEntryBlock = true;
                    };

                    $scope.hideNewVarEntrySection = function(){
                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };

                    $scope.addNewVarEntry = function(res){
                        //res.do = 1;
                        $scope.doVarList.push(res.variable);

                        $scope.addNewEntry = {};
                        $scope.showNewVarEntryBlock = false;
                    };
                    /* variable */

                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],
                size: size,
                animation: true
            });
        },

        doModalOnDbClick: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/do-modal-on-db-click.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

                    //console.log('test');
                    $scope.node = node;
                    $scope.targetUrl=undefined;
                    $scope.designerWindow = function () {
                        $scope.targetUrl = "#/do/designer/" + node.data.type6.doFileName;

                    };
                    $scope.scriptWindow = function () {
                        $scope.targetUrl = "#/do/script/" + node.data.type6.doFileName;

                    };
                    $scope.ok = function () {
                        $uibModalInstance.dismiss('cancel');
                        //$uibModalInstance.close('call');

                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],
                size: size,
                animation: true
            });
        },

        conditionModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/condition-modal.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    $scope.node = node;
                    //$scope.node.enterCondition = "accessCode";


                    $scope.conditiontext = $scope.node.enterCondition;

                    $scope.ok = function () {
                        if ($scope.node.enterCondition === '?') {
                            $scope.node.enterCondition = $scope.conditiontext;
                        }
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        testConditionModal: function (size, node, callback) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/test-condition-modal.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    $scope.node = node;
                    //$scope.node.enterCondition = "accessCode";


                    $scope.conditiontext = $scope.node.enterCondition;

                    $scope.ok = function () {
                        if ($scope.node.enterCondition === '?') {
                            $scope.node.enterCondition = $scope.conditiontext;
                        }
                        $uibModalInstance.close('call');
                        callback($scope.node);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                }],

                size: size,
                animation: true
            });

            //modalInstance.result.then(callback);
        },

        invalidDropModal: function(size, dropnodename, parentnodename) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal/invalid-drop-modal.html',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    $scope.errorMessage = dropnodename + ' is not allowed inside ' + parentnodename;
                    $scope.ok = function () {
                        $uibModalInstance.close('call');
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                size: size,
                animation: true
            });
        }
    }
}]);
