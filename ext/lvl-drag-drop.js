var module = angular.module("lvl.directives.dragdrop", ['lvl.services']);

module.directive('lvlDraggable', ['$rootScope', 'uuid', function ($rootScope, uuid) {
    return {
        restrict: 'A',
		scope: true,
        link: function (scope, el, attrs, controller) {

            angular.element(el).attr("draggable", "true");

            var id = angular.element(el).attr("id");

            if (!id) {
                id = uuid.new()
                angular.element(el).attr("id", id);
            }

            el.bind("dragstart", function (e) {
				e.dataTransfer.setData('text', angular.toJson(scope.$eval(attrs.lvlDraggable)));
                //e.originalEvent.dataTransfer.setData('text', id);

                $rootScope.$emit("LVL-DRAG-START");
            });

            el.bind("dragend", function (e) {
                $rootScope.$emit("LVL-DRAG-END");
            });
        }
    };
}]);

module.directive('lvlDropTarget', ['$rootScope', '$timeout', 'uuid', function ($rootScope, $timeout, uuid) {
    return {
        restrict: 'A',
        scope: {

            onDrop: '&'
        },
        link: function (scope, el, attrs, controller) {
            var id = angular.element(el).attr("id");
            if (!id) {
                id = uuid.new();
                angular.element(el).attr("id", id);
            }

            el.bind("dragover", function (event) {
                if (event.preventDefault) {
                    event.preventDefault(); // Necessary. Allows us to drop.
                }

                event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                //e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                return false;
            });

            el.bind("dragenter", function (event) {
                // this / e.target is the current hover target.
                angular.element(event.target).addClass('lvl-over');
            });

            el.bind("dragleave", function (event) {
                angular.element(event.target).removeClass('lvl-over');  // this / e.target is previous target element.
            });

            el.bind("drop", function (event) {
		
                if (event.preventDefault) {
                    event.preventDefault(); // Necessary. Allows us to drop.
                }

                if (event.stopPropagation) {
                    event.stopPropagation(); // Necessary. Allows us to drop.
                }
                var data = event.dataTransfer.getData("text");
                //var data = event.originalEvent.dataTransfer.getData("text");
                var dest = document.getElementById(id);
                var src = document.getElementById(data);

				var localObject;
				localObject = scope.$eval(attrs.lvlDropTarget);
				
				var transferredObject;
				transferredObject = JSON.parse(data)
                scope.onDrop({dragElement: transferredObject, dropElement: localObject});
			
				 $timeout(function() {  }, 0);
			
            });

            $rootScope.$on("LVL-DRAG-START", function () {
                var el = document.getElementById(id);
                angular.element(el).addClass("lvl-target");
            });

            $rootScope.$on("LVL-DRAG-END", function () {
                var el = document.getElementById(id);
                angular.element(el).removeClass("lvl-target");
                angular.element(el).removeClass("lvl-over");
            });
        }
    };
}]);
