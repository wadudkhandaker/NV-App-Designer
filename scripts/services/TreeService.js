app.factory("TreeService", ['$q', 'DummyStoreService', function ($q, DummyStoreService) {
    var TreeService = {};

    TreeService.getTrees = function () {

        return DummyStoreService.getAll('trees');
    };

    TreeService.getTree = function (id) {

        return DummyStoreService.getOne('trees', id);
    };

    TreeService.save = function (user) {

        if (user.isNew()) {
            return DummyStoreService.add('trees', user);
        } else {
            return DummyStoreService.update('trees', user);
        }
    };

    TreeService.remove = function (user) {

        return DummyStoreService.remove('trees', user.id);
    };

    return TreeService;
}]);