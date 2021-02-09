app.factory("VariableService", ['$http', function($http){
    return{
        getDialVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.dial == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getPlayFTPVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.playFileToPlay == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getPlayDirectoryVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.playDirectory == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getRecordFileVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.recordFile == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getRecordDirectoryVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.recordDirectory == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getGetKeyVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.getKey == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getMenuFTPVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.menuFileToPlay == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getMenuGetKeyVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.menuGetKey == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getCaseVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.case == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getLetModuleVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.letModule == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getLetSystemVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.letSystem == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getCheckWeekCheckFileVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.checkWeekCheckFile == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getCheckWeekActionVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.checkWeekAction == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getCheckYearCheckFileVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.checkYearCheckFile == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getCheckYearActionVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.checkYearAction == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        },

        getExecVariableVariables: function(){
            return $http.get('scripts/services/json/variable.json').then(function(response) {
                var result = [];
                angular.forEach(response.data, function(res){
                    if(res.execVariable == 1){
                        result.push(res.variable);
                    }
                });

                return result;    
            });
        }
    };
}]);