app.factory("TreeCreateCommand", ['$q', 'TreeService', function ($q, TreeService) {
    function TreeCreateCommand(treeToCreate) {
        this.treeToCreate = treeToCreate;
        this.treeCreated = null;
    }

    TreeCreateCommand.prototype = {
        execute: function () {
            return TreeService.save(this.treeToCreate).then(function (treeCreated) {

                this.treeCreated = treeCreated;

                return treeCreated;
            }.bind(this));

        },

        reverse: function () {

            return TreeService.remove(this.treeCreated).then(function () {
                this.treeCreated = null;
            }.bind(this));
        }
    };

    return TreeCreateCommand;
}]);
