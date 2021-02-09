function TreeFactory() {

    /* jshint -W004 */
    var TreeFactory = function TreeFactory(data) {

        data = data || {};

        this.treeObj = data.treeObj || null;
    };

    TreeFactory.prototype = {
        /**
         * @returns {boolean}
         */
        isNew: function () {
            return !this.id;
        }
    };

    return TreeFactory;
}
angular
       .module('treeApp')
       .factory('Tree', TreeFactory);