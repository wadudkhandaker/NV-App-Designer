app.factory("UndoService", ['$q', function ($q) {
    var UndoService = {
        undos: [],
        redos: []
    };

    UndoService.undo = function () {

        if (!UndoService.undos.length) {

            var deferred = $q.defer();
            deferred.resolve('nothing to undo');

            return deferred.promise;
        }

        var command = UndoService.undos.pop();

        return command.reverse().then(function (data) {
            UndoService.redos.push(command);

            return data;
        });
    };

    UndoService.redo = function () {
        if (!UndoService.redos.length) {
            var deferred = $q.defer();
            deferred.resolve('nothing to redo');

            return deferred.promise;
        }

        var command = UndoService.redos.pop();

        return command.execute().then(function (data) {
            UndoService.undos.push(command);

            return data;
        });
    };

    UndoService.executeCommand = function (command) {
        UndoService.redos = [];
        return command.execute().then(function (data) {
            UndoService.undos.push(command);

            return data;
        });
    };

    return UndoService;
}]);

//app.factory("TreeCreateCommand", ['$q', 'TreeService', function ($q, TreeService) {
//    function TreeCreateCommand(treeToCreate) {
//        this.treeToCreate = treeToCreate;
//        this.treeCreated = null;
//    }

//    TreeCreateCommand.prototype = {
//        execute: function () {
//            return TreeService.save(this.treeToCreate).then(function (treeCreated) {

//                this.treeCreated = treeCreated;

//                return treeCreated;
//            }.bind(this));

//        },

//        reverse: function () {

//            return TreeService.remove(this.treeCreated).then(function () {
//                this.treeCreated = null;
//            }.bind(this));
//        }
//    };

//    return TreeCreateCommand;
//}]);
//app.factory("TreeService", ['$q', 'DummyStoreService', function ($q, DummyStoreService) {
//    var TreeService = {};

//    TreeService.getTrees = function () {

//        return DummyStoreService.getAll('trees');
//    };

//    TreeService.getTree = function (id) {

//        return DummyStoreService.getOne('trees', id);
//    };

//    TreeService.save = function (user) {

//        if (user.isNew()) {
//            return DummyStoreService.add('trees', user);
//        } else {
//            return DummyStoreService.update('trees', user);
//        }
//    };

//    TreeService.remove = function (user) {

//        return DummyStoreService.remove('trees', user.id);
//    };

//    return TreeService;
//}]);
//app.factory("DummyStoreService", ['$q', '$window', function ($q, $window) {
//    var data = {},
//           CryptoJS = $window.CryptoJS,
//           getEntityIndex = function (type, id) {

//               if (undefined === data[type]) {
//                   data[type] = [];
//               }

//               for (var index = 0 ; index < data[type].length ; index++) {

//                   if (data[type][index].id === id) {
//                       return index;
//                   }
//               }

//               return -1;
//           },
//           /* jshint -W004 */
//           DummyStoreService = {};

//    DummyStoreService.getAll = function (type) {

//        var deferred = $q.defer();

//        if (undefined === data[type]) {
//            data[type] = [];
//        }

//        deferred.resolve(data[type]);

//        return deferred.promise;

//    };

//    DummyStoreService.getOne = function (type, id) {

//        var deferred = $q.defer();

//        if (data[type][id]) {
//            deferred.resolve(data[type][id]);
//        } else {
//            deferred.reject('Entity doesnt exist in this dummy store');
//        }

//        return deferred.promise;
//    };

//    DummyStoreService.add = function (type, entity) {
//        entity = angular.copy(entity);
//        var deferred = $q.defer();

//        entity.id = CryptoJS.SHA1('' + new Date().getTime()).toString();
//        data[type].push(entity);

//        deferred.resolve(entity);

//        return deferred.promise;
//    };

//    DummyStoreService.update = function (type, entity) {

//        var deferred = $q.defer(),
//            index = getEntityIndex(type, entity.id);

//        if (index > -1) {
//            data[type][index] = entity;
//            deferred.resolve(entity);
//        } else {
//            deferred.reject('Entity doesnt exist in this dummy store');
//        }

//        return deferred.promise;
//    };

//    DummyStoreService.remove = function (type, id) {

//        var deferred = $q.defer(),
//            index = getEntityIndex(type, id);

//        if (index > -1) {
//            data[type].splice(index, 1);
//            deferred.resolve();
//        } else {
//            deferred.reject('Entity doesnt exist in this dummy store');
//        }

//        return deferred.promise;
//    };

//    return DummyStoreService;
//}]);


//function TreeFactory() {

//    /* jshint -W004 */
//    var TreeFactory = function TreeFactory(data) {

//        data = data || {};

//        this.treeObj = data.treeObj || null;
//    };

//    TreeFactory.prototype = {
//        /**
//         * @returns {boolean}
//         */
//        isNew: function () {
//            return !this.id;
//        }
//    };

//    return TreeFactory;
//}
//angular
//       .module('treeApp')
//       .factory('Tree', TreeFactory);