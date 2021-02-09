app.controller('TreeController', ['$scope', '$state', 'UndoService', 'TreeCreateCommand', 'TreeService', 'Tree', 'trees', '$timeout', 'FileUploader', 'Upload', 'modalService', '$compile','$stateParams', 'converter', 'utils',
function ($scope, $state, UndoService, TreeCreateCommand, TreeService, Tree, trees, $timeout, FileUploader, Upload, modalService, $compile, $stateParams, converter, utils) {

        var self = this;
        $scope.clipboard = undefined;
        $scope.inspect = undefined;
        $scope.nodecount = 1;

        $scope.printTree = function () {
            console.log($scope.models.tree);
        };

        $scope.onNodeClick = function (node) {
            console.log(node.name+' has been clicked');
            console.log('id is '+node.id);
        };

        $scope.models =
        {
            preset:
            {
                group1:
                    [
                        // play node
                        new Node(
                                    {
                                        id: 0,
                                        name: "play",
                                        type: "play",
                                        displayText: "play",
                                        isVisible: true,
                                        icon: "fa-play"
                                    },
                                    {
                                        type6: {
                                            fileName: "",
                                            ftpVar: false,
                                            ftpVarSelect: "",
                                            directory: false,
                                            dirVal: "",
                                            dirVar: false,
                                            dirVarSelect: "",
                                            part: false,
                                            partNumber: 1,
                                            stopOnDtmf: true,
                                            continueAfterHangup: false,
                                            consoleOutput: "Play File"
                                        }
                                    },
                                    null
                                ),

                        //record node
                        new Node(
                                    {
                                        id: 0,
                                        name: "record",
                                        type: "record",
                                        displayText: "record",
                                        isVisible: true,
                                        icon: "fa-microphone"
                                    },
                                    {
                                        type6: {
                                            fileName: "",
                                            riVar: false,
                                            riVarSelect: "",
                                            directory: false,
                                            dirVal: "",
                                            dirVar: false,
                                            dirVarSelect: "",
                                            timeout: false,
                                            timeoutDuration: 200,
                                            stopOnDtmf: false,
                                            continueAfterHangup: false,
                                            consoleOutput: "Record File"
                                        }
                                    },
                                    null
                                ),

                        // get key
                        new Node(
                                    {
                                        id: 0,
                                        name: "getKey",
                                        type: "getKey",
                                        displayText: "get key",
                                        isVisible: true,
                                        icon: "fa-th"
                                    },
                                    {
                                        type6: {
                                            maxKey: "1",
                                            variable: "",
                                            timeout: false,
                                            timeoutDuration: "",
                                            continueAfterHangup: false,
                                            consoleOutput: "Get Key"
                                        }
                                    },
                                    null
                                ),

                        //menu node
                        new Node(
                                    {
                                        id: 0,
                                        name: "menu",
                                        type: "menu",
                                        displayText: "menu",
                                        isVisible: true,
                                        itemHidden: false,
                                        icon: "fa-list-alt"
                                    },
                                    {
                                        type6: {
                                            fileName: "",
                                            ftpVar: false,
                                            ftpVarSelect: "",
                                            directory: false,
                                            dirVal: "",
                                            dirVar: false,
                                            dirVarSelect: "",
                                            part: false,
                                            partNumber: 1,
                                            stopOnDtmf: true,
                                            playContinueAfterHangup: false,
                                            maxKey: 1,
                                            variableSelect: "",
                                            timeout: false,
                                            timeoutDuration: 30,
                                            keyContinueAfterHangup: false,
                                            repeatOnTimeout: false,
                                            loop: "once",
                                            loopCount: 3,
                                            loopWhile: "",
                                            consoleOutput: "Menu"
                                        }
                                    },
                                    null,
                                    []
                                ),

                        // dial
                        new Node(
                                    {
                                        id: 0,
                                        name: "dial",
                                        type: "dial",
                                        displayText: "dial",
                                        isVisible: true,
                                        icon: "fa-volume-control-phone"
                                    },
                                    {
                                        type6: {
                                            dial: "",
                                            variable: false,
                                            variableVar: "",
                                            maxRing: false,
                                            maxRingVal: "",
                                            goOffHook: false,
                                            continueAfterHangup: false,
                                            consoleOutput: "Dial"
                                        }
                                    },
                                    null
                                ),

                        // hang
                        new Node(
                                    {
                                        id: 0,
                                        name: "hang",
                                        type: "hang",
                                        displayText: "hang",
                                        isVisible: true,
                                        icon: "fa-phone-square"
                                    },
                                    {
                                        type6: {}
                                    },
                                    null
                                )
                    ],

                group2:
                    [
                        // case
                        new Node(
                                    {
                                        id: 0,
                                        name: "case",
                                        type: "menu",
                                        displayText: "case",
                                        isVisible: true,
                                        icon: "fa-list-ol"
                                    },
                                    {
                                        type6: {
                                            variable: "",
                                            consoleOutput: "Case"
                                        }
                                    },
                                    null,
                                    []
                                ),

                        // let
                        new Node(
                                    {
                                        id: 0,
                                        name: "letNode",
                                        type: "let",
                                        displayText: "let",
                                        isVisible: true,
                                        icon: "fa-cube"
                                    },
                                    {
                                        type6: {
                                            variable: "module",
                                            variableModVar: "",
                                            variableSysVar: "",
                                            expression: ""
                                        }
                                    },
                                    null
                                ),

                        //test
                        new Node(
                                    {
                                        id: 0,
                                        name: "test",
                                        type: "menu",
                                        displayText: "test",
                                        isVisible: true,
                                        icon: "fa-question-circle-o"
                                    },
                                    {
                                        type6: {
                                            expression: "",
                                            consoleOutput: "Test"
                                        }
                                    },
                                    null,
                                    []
                                ),

                        // week
                        new Node(
                                    {
                                        id: 0,
                                        name: "week",
                                        type: "week",
                                        displayText: "week",
                                        isVisible: true,
                                        icon: "fa-calendar-check-o"
                                    },
                                    {
                                        type6: {
                                            checkFile: "",
                                            variable: false,
                                            variableSelect: "",
                                            action: false,
                                            actionSelect: "",
                                            consoleOutput: "Check Week"
                                        }
                                    },
                                    null
                                ),

                        // year
                        new Node(
                                    {
                                        id: 0,
                                        name: "year",
                                        type: "year",
                                        displayText: "year",
                                        isVisible: true,
                                        icon: "fa-calendar"
                                    },
                                    {
                                        type6: {
                                            checkFile: "",
                                            variable: false,
                                            variableSelect: "",
                                            action: false,
                                            actionSelect: "",
                                            consoleOutput: "Check Week"
                                        }
                                    },
                                    null
                                ),

                        //repeat node
                        new Node(
                                    {
                                        name: "repeat",
                                        type: "repeat",
                                        displayText: "repeat",
                                        isVisible: true,
                                        isEnable: true,
                                        icon: "fa-repeat"
                                    },
                                    {
                                        type6: {
                                            looptype: "count",
                                            count: 3,
                                            whileCondition: "",
                                            consoleoutput: "WhileEx"
                                        }
                                    },
                                    null,
                                    []
                                ),

                        //sequence node
                        new Node(
                                    {
                                        id: 0,
                                        name: "sequence",
                                        type: "sequence",
                                        displayText: "seq",
                                        isVisible: true,
                                        icon: "fa-outdent"
                                    },
                                    {
                                        type6: {
                                        }
                                    },
                                    null,
                                    []
                                ),

                        //do node
                        new Node(
                                    {
                                        id: 0,
                                        name: "doNode",
                                        type: "do",
                                        displayText: "do",
                                        isVisible: true,
                                        icon: "fa-files-o"
                                    },
                                    {
                                        type6: {
                                            doFileName: "",
                                            doVariable: "",
                                            consoleoutput: "Module call"
                                        }
                                    },
                                    null
                                ),

                        // return
                        new Node(
                                    {
                                        id: 0,
                                        name: "return",
                                        type: "return",
                                        displayText: "return",
                                        isVisible: true,
                                        icon: "fa-compress"
                                    },
                                    {
                                        type6: {}
                                    },
                                    null
                                ),

                        // exec
                        new Node(
                                    {
                                        id: 0,
                                        name: "exec",
                                        type: "exec",
                                        displayText: "exec",
                                        isVisible: true,
                                        icon: "fa-file-code-o"
                                    },
                                    {
                                        type6: {
                                            command: "",
                                            variable: false,
                                            variableVar: "",
                                            waitForCompletion: true,
                                            consoleOutput: "Exec"
                                        }
                                    },
                                    null
                                ),

                        // break
                        new Node(
                                    {
                                        id: 0,
                                        name: "break",
                                        type: "break",
                                        displayText: "break",
                                        isVisible: true,
                                        icon: "fa-chain-broken"
                                    },
                                    {
                                        type6: {}
                                    },
                                    null
                                ),
                    ],

            },

            tree: [
                    new Node(
                                {
                                    id: 0,
                                    name: "root",
                                    type: "root",
                                    icon: "red",
                                    displayText: "Start",
                                    isVisible: true,
                                    isEnable:  true,

                                },
                                {

                                },
                                null
                            )
                ],
        };

        $scope.context =
        {
            parent: undefined,
            child: undefined,
            index: undefined,
        };

        $scope.trees = trees;

        $scope.openPlayModal = function (node) {
            modalService.playModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openGetKeyModal = function (node) {
            modalService.getKeyModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openDialModal = function (node) {
            modalService.dialModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openLetModal = function (node) {
            modalService.letModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openWeekModal = function (node) {
            modalService.weekModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openYearModal = function (node) {
            modalService.yearModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openMenuModal = function (node) {
            modalService.menuModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openExecModal = function (node) {
            modalService.execModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openCaseModal = function (node) {
            modalService.caseModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openRecordModal = function (node) {
            modalService.recordModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openRepeatModal = function (node) {
            modalService.repeatModal('md', node, function (data) {
                node = data;
            });
        };

        $scope.openDoModal = function (node) {
            modalService.doModal('md', node, function (data) {
                node = data;
            });
        };
        $scope.doModalOnDbClick = function (node) {
            modalService.doModalOnDbClick('md', node, function (data) {
                node = data;
            });
        };
        $scope.openTestModal = function (node) {
            modalService.testModal('md', node, function (data) {
                node = data;
            });
        }

        $scope.modaltypes = {
            play: $scope.openPlayModal,
            record: $scope.openRecordModal,
            repeat: $scope.openRepeatModal,
            getKey: $scope.openGetKeyModal,
            menu: $scope.openMenuModal,
            dial: $scope.openDialModal,
            doNode: $scope.openDoModal,
            letNode: $scope.openLetModal,
            week: $scope.openWeekModal,
            doNodeOnDbCLick: $scope.doModalOnDbClick,
            year: $scope.openYearModal,
            exec: $scope.openExecModal,
            case: $scope.openCaseModal,
            test: $scope.openTestModal
        };

        $scope.selectModalType = function (node) {
            if ((node.name !== 'root' && node.name !== 'return' && node.name !== 'hang' && node.name != 'break' && node.name !== 'placeholder' && node.name !== 'sequence') && !$scope.dbClick) {
                if (node.name == 'doNodeOnDbCLick') {
                    node.name = 'doNode';
                };
                $scope.modaltypes[node.name](node);
            }
            else {
                if (node.type == 'return' || node.type == 'hang' || node.type == 'root' || node.name == 'break' || node.name == 'sequence') {
                    return;
                }
                if (node.name == 'doNode') {
                    if (node.data.type6.doFileName) {
                        node.name = 'doNodeOnDbCLick';
                        $scope.modaltypes[node.name](node);
                    }
                    $scope.dbClick = false;
                    return;
                };
                $scope.modaltypes[node.name](node);
            }
        };

        $scope.trees = trees;

        var stateReload = function () {
            $state.reload();
        };

        $scope.undo = function () {
            UndoService.undo().then(function (data, data1) {
                if (trees.length) $timeout(function () { $scope.models.tree = angular.copy((trees[trees.length - 1].treeObj)) }, 0);
                else stateReload();
            });
        };

        $scope.redo = function () {
            UndoService.redo().then(function (data, data1) {
                if (trees.length) $timeout(function () { $scope.models.tree = angular.copy((trees[trees.length - 1].treeObj)) }, 0);
                else stateReload();

            });
        };

        var removeStyles = function (testnode) {
            delete testnode.icon;
            delete testnode.displayText;
            delete testnode.isVisible;
            delete testnode.isEnable;
            delete testnode.icon;
            delete testnode.color;
            delete testnode.parent;

            if (testnode.type == 'menu') {
                testnode.items.forEach(removeStyles);
            }

            if(testnode.child !== null) {
                removeStyles(testnode.child);
            }

            return testnode;
        };

        $scope.save = function (filename) {
            if ($stateParams.nodeName) {
                filename= $stateParams.nodeName +".json"
            }
            var text = angular.toJson($scope.models.tree);

            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', filename);

            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                console.log(event);
                event.initEvent('click', true, true);
                pom.dispatchEvent(event);
            }
            else {
                pom.click();
            }
        }

        $scope.saveNvt = function () {
            var saveFile = utils.saveFile;
            if ($scope.models.tree[0].child != null) {
                var promise = converter.convert($scope.models.tree);
                promise.then(function(result) {
                    saveFile(result, 'tree.NVT');
                });
            }
        }

        $scope.load = function () {
            var f = document.getElementById('file').files[0],
                r = new FileReader();
            r.onloadend = function (e) {
                $scope.data = e.target.result;
            }
            r.readAsBinaryString(f);

            $scope.models.tree = JSON.parse($scope.data)
        }

        $scope.disableConfig = false;
        $scope.disableCopy = false;
        $scope.disableRemove = false;
        $scope.disablePaste = false;
        $scope.clickCopy = false;
        $scope.disableCollapse = false;
        $scope.disableExpand = false;

        $scope.onShow = function (parent, index, child) {
            $scope.show_config_window = false;

            $scope.context.parent = parent;
            $scope.context.child = child;
            if ($scope.context.child == null) {
                $scope.disableConfig = true;
                $scope.disableCopy = true;
                $scope.disableRemove = true;
                if (!$scope.clickCopy) {
                    $scope.disablePaste = true;
                }
                $scope.disableCollapse = true;
                $scope.disableExpand = true;

            }
            else {
                $scope.disableConfig = false;
                $scope.disableCopy = false;
                $scope.disableRemove = false;
                $scope.disablePaste = false;
                if (child.type == 'menu' && child.items.length > 0) {

                    if (child.itemHidden) {
                        $scope.disableCollapse = true;
                        $scope.disableExpand = false;
                    }
                    else {
                        $scope.disableCollapse = false;
                        $scope.disableExpand = true;
                    }

                }
                else if (child.type != 'menu' && child.child != null) {

                    $scope.disableCollapse = child.child.isVisible? false : true;
                    $scope.disableExpand = child.child.isVisible? true : false;
                }
                else {

                    $scope.disableCollapse = true;
                    $scope.disableExpand = true;
                }

            }
            $scope.context.index = index;
        };

        $scope.onClose = function () {
            $scope.context.parent = undefined;
            $scope.context.child = undefined;
            $scope.context.index = undefined;
        }

        $scope.configure = function (node) {
            $scope.selectModalType(node);
        };

        $scope.onDbClick = function (node) {
            $scope.dbClick = true;
            $scope.configure(node);
        }

        $scope.conditionConfig = function (node, parent) {
            var item = node;
            if(parent.name == 'menu' || parent.name == 'case') {
                modalService.conditionModal('md', node, function (node) {
                    item = node;
                });
            }
            else if (parent.name == 'test') {
                modalService.testConditionModal('md', node, function (node) {
                    item = node;
                });
            }
        }

        $scope.copyNode = function () {
            var copiednode;
            if (($scope.context.index == 0 && $scope.context.parent.items && $scope.context.parent.items[0] == $scope.context.child) || $scope.context.index > 0) {
                copiednode = angular.copy($scope.context.parent.items[$scope.context.index]);
            }
            else {
                copiednode = angular.copy($scope.context.parent.child);
            }

            $scope.clipboard = copiednode;
            $scope.clickCopy = true;
        };

        $scope.createObjForUndoRedo = function () {
            var tree = new Tree({
                treeObj: angular.copy($scope.models.tree)
            });
            UndoService.executeCommand(new TreeCreateCommand(tree)).then();
        }

        $scope.pasteNode = function () {
            if ($scope.clipboard !== undefined) {
                $scope.assignId($scope.clipboard);
                $scope.context.parent.child = angular.copy($scope.clipboard);
            }
        }

        $scope.uploadFiles = function (file) {
            console.log(file);
            console.log('name of the file is ' + file.name);
            $scope.context.child.data.type6.filename = file.name;
        }

        function hasClass(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function removeClass(ele, cls) {
            if (hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        }

        function removeMenuItem (menu, menuitem) {
            for (i=0; i<menu.items.length; i++) {
                if (menu.items[i].id === menuitem.id) {
                    menu.items.splice(i,1);
                }
            }
        }

        $scope.removeNode = function () {
            if ($scope.context.parent.type == 'menu') {
                removeMenuItem($scope.context.parent, $scope.context.child);
            }
            $scope.context.parent.child = null;
            $scope.createObjForUndoRedo();
            var eleName = document.getElementById('menu');
            removeClass(eleName, 'open');
        };

        $scope.collapseChild = function () {
            if ($scope.context.child.type == 'menu') {
                $scope.context.child.itemHidden = true;
                $scope.context.child.items.forEach(function (item) {
                    item.isVisible = false;
                });
            }
            else if ($scope.context.child.type != menu && $scope.context.child.child != null) {
                $scope.context.child.child.isVisible = false;
            }
        };

        $scope.expandChild = function () {
            if ($scope.context.child.type == 'menu') {
                $scope.context.child.itemHidden = false;
                $scope.context.child.items.forEach(function (item) {
                    item.isVisible = true;
                });
            }
            else if ($scope.context.child.type != menu && $scope.context.child.child != null) {
                $scope.context.child.child.isVisible = true;
            }
        }

        $scope.replace = function (dragElement, dropElement, dragParent, index) {
            dragParent.children.splice(index, 1);
            dragParent.children.splice(index, 0, dragElement);
            $scope.createObjForUndoRedo();
        };

        $scope.insert = function (dragElement, dropElement, parent, index) {
            removed = parent.children.splice(index, 1)
            parent.children.splice(index, 0, dragElement)
            if (parent.children[index].children.length > 0) {
                parent.children[index].children.splice(0, 1, removed[0])
            }
        };

        $(window).on("resize", function () {
            $timeout(function () {
                var $documentHeight = $(document).height();
                //$('.left').css({ 'height': $documentHeight + 'px' });
            }, 10)
        });

        $(window).on("scroll", function () {
            $timeout(function () {
                var $documentHeight = $(document).height();
                //$('.left').css({ 'height': $documentHeight + 'px' });
                if ($scope.mobileMode && !$scope.sidebarCollapse) {
                    //var $documentHeight = $(document).height();
                    //$('.left').css({ 'height': $documentHeight + 'px' });
                    //if (!$scope.itemDragging) {
                    //    var $windowHeight = $(window).height();
                    //    //$('.left').css({ 'padding-top': $documentHeight - $windowHeight});
                    //}
                }

            }, 10)
        });

        $scope.leftPanelScroll = false;
        $scope.start = function (event, context, item, index) {
            $scope.dragEle = item;
            $('.dropable-line').addClass('hightlight');
            $('.icon.empty').addClass('lvl-target');
            $('.dropable').addClass('lvl-target');
            $('.panel.left').addClass('overflow-initial');
            $('.panel.middle').addClass('scroll');
            //$('.left').attr('style', 'padding-top: 0px !important');
        }

        $scope.onDrag = function (event, context) {
            $scope.itemDragging = true;
            $('.panel.left').addClass('overflow-initial');
            //$scope.sidebarCollapse = true;
            //var draggingDiv = $('.ui-draggable-dragging').css("left");
            //draggingDiv = parseInt(draggingDiv);
            //if (draggingDiv > 325) {

            //$('.top-bar').addClass('top-bar-on-scroll');
            //$('.top-bar').css({ 'width': draggingDiv + 'px'});
            //}
            //console.log(draggingDiv);
        }

        $scope.stop = function (event, context) {
            $scope.dbClick = false;
            $scope.leftPanelScroll = false;
            $scope.itemDragging = false;
            $('.dropable-line').removeClass('hightlight');
            $('.icon.empty').removeClass('lvl-target');
            $('.dropable').removeClass('lvl-target');
            $('.panel.left').removeClass('overflow-initial');
            //$('.left').attr('style', 'padding-top: 0px !important');
            $('.top-bar').removeClass('panel-collapsed');
            //$('.top-bar').removeClass('top-bar-on-scroll');
            //$('.top-bar').css({ 'width': 'initial' });
        }

        $scope.assignId = function (node) {
            if (node !== null) {
                node.id = $scope.nodecount;
                $scope.nodecount++;
                $scope.assignId(node.child);
                if(node.type == 'menu') {
                    node.items.forEach(function (item) {
                        $scope.assignId(item);
                    });
                }
            }
        };

        $scope.drop = function (event, context, something, something2, parentnode, node) {
            var draggedItem = angular.copy($scope.dragEle);
            $scope.assignId(draggedItem);

            if( (draggedItem.type == 'repeat' && parentnode.parentReference == 'menu') || (draggedItem.type == 'menu' && parentnode.parentReference == 'repeat') ||
                (draggedItem.type == 'sequence' && parentnode.parentReference == 'menu') || (draggedItem.type == 'sequence' && parentnode.parentReference == 'repeat')) {
                modalService.invalidDropModal('md', draggedItem.name, parentnode.parentReference);
                return;
            }

            else {
                if (node == null) {
                    draggedItem.parentReference = parentnode.parentReference;
                    parentnode.child = draggedItem;
                }
                else if (node.type == 'menu' || node.type == 'sequence') {
                    if (node.name == 'test' && node.items.length > 1) {
                        return;
                    }
                    if (draggedItem.type == 'repeat' || draggedItem.type == 'sequence') {
                        modalService.invalidDropModal('md', draggedItem.name, node.type);
                        return;
                    }
                    draggedItem.enterCondition = "?";
                    draggedItem.parentReference = node.type;
                    node.items.push(draggedItem);
                }
                else if (node.type == 'repeat') {
                    if (draggedItem.type == 'menu' || draggedItem.type == 'repeat' || draggedItem.type == 'sequence') {
                        modalService.invalidDropModal('md', draggedItem.name, node.type);
                        return;
                    }
                    draggedItem.parentReference = "repeat";
                    parentnode.items.push (draggedItem);
                }
            }

            $scope.configure(draggedItem);
            $scope.createObjForUndoRedo();
        };

        $scope.highlights = function (event, ui) {
            $(event.target).addClass('dragable-col');
        }

        $scope.out = function (event, ui) {
            $(event.target).removeClass('dragable-col');
        }

        $scope.sidebarCollapse = false;
        $scope.toggleBtnClicked = function () {
            $scope.sidebarCollapse = !$scope.sidebarCollapse;
        };

        var windowWidth = viewport().width;
        function getDeviceMode() {
            if (windowWidth < 767) {
                $scope.mobileMode = true;
            }
            else if (windowWidth > 767 && windowWidth < 992) {
                $scope.tabMode = true;
            }
        }

        getDeviceMode();

        if ($scope.mobileMode) {
            $scope.sidebarCollapse = true;
        }

        window.addEventListener('resize', function (event) {
            $timeout(function () {
                getDeviceMode();
                //if ($scope.mobileMode) {
                //    $scope.sidebarCollapse = true;
                //}
            }, 50);
        });

        function viewport() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width: e[a + 'Width'], height: e[a + 'Height'] };
        }

        $scope.showFileName = false;
        $scope.fileProgress = false;
        $scope.uploadFile = function (e) {
            e.preventDefault();
            $timeout(function () { $('#file').trigger('click'); }, 0);

        }

        var uploader = $scope.uploader = new FileUploader({
            url: '',
            autoUpload: true
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
        };

        uploader.onAfterAddingFile = function (fileItem) {
            $scope.showFileName = true;
            $scope.fileProgress = true;
            //console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            //console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            //alert(progress);
            //console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            //alert(progress);
            //console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {

            //console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            //console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            var f = fileItem._file,
                r = new FileReader();
            r.readAsBinaryString(f);
            r.onloadend = function (e) {
                $scope.data = e.target.result;
                $scope.models.tree = JSON.parse($scope.data);
                //$scope.models.tree = JSON.parse($scope.data);
                //console.log($scope.models.tree);
                $timeout(function () { $scope.$apply() }, 0);
                $scope.hideProgress();
            }
            $scope.showFileName = true;
            //console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            //console.info('onCompleteAll');
        };

        //console.info('uploader', uploader);

        $scope.hideProgress = function () {
            $scope.showFileName = false;
            $scope.fileProgress = false;
        }
        // -------------------------------


        var controller = $scope.controller = {
            isImage: function (item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

    }]);
