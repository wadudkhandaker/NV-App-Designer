	function Node( args, data, child, items)
	{
		this.name = typeof args.name !== 'undefined' ? args.name : 'Unnamed Node';
		this.type = args.type !== 'undefined' ? args.type : 0;
		this.icon = args.icon !== 'undefined' ? args.icon : "";
		this.displayText = args.displayText;
		this.parent = args.parent;
		this.id = args.id;
		if(typeof args.externalBranch !== 'undefined') {
			this.externalBranch = args.externalBranch;
		}
		this.isVisible = args.isVisible;
		this.color = typeof args.color !== 'undefined' ?  args.color : '';
		this.data = data;
		//this.children = typeof children !== 'undefined' ? children : new Array();
		if(typeof items !== 'undefined') {
			this.items = items;
		}
		this.child = child;
	}
	/// ///////////////////////////////////////////////////////////////////////
	/// ///////////////////////////////////////////////////////////////////////

	var app = angular.module('treeApp', ['ui.router', 'ng-context-menu', 'ngDragDrop', 'angularFileUpload', 'ngFileUpload', 'ui.bootstrap', 'ngAnimate', 'ui.select', 'ngSanitize', 'parserApp']);

	app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$provide', function ($stateProvider, $httpProvider, $urlRouterProvider, $provide) {
	    $provide.decorator('$state', ['$delegate', function ($delegate) {
	        $delegate.reload = function () {
	            this.transitionTo(this.current, this.$current.params, { reload: true, inherit: true, notify: true });
	        };
	        return $delegate;
	    }]);
	    $urlRouterProvider.otherwise('/home');

	    //$stateProvider.state('site', {
	    //    'abstract': true,
	    //})
	    $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'TreeController',
                resolve: {
                    trees: ['TreeService', function (TreeService) {
                        return TreeService.getTrees();
                    }]
                }
	    });
	    $stateProvider.state('doDesigner', {
	        url: '/do/designer/:nodeName',
	        templateUrl: 'views/home.html',
	        controller: 'TreeController',
	        resolve: {
	            trees: ['TreeService', function (TreeService) {
	                return TreeService.getTrees();
	            }]
	        }
	    });
	    $stateProvider.state('doScript', {
	        url: '/do/script/:nodeName',
	        templateUrl: 'views/do-script.html',
	        controller: 'doScriptController',
	        resolve: {
	            trees: ['TreeService', function (TreeService) {
	                return TreeService.getTrees();
	            }]
	        }
	    });
	}]);
	//console.log = function () {};
