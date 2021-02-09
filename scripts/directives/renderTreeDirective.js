app.directive("renderTree", function ($compile, $timeout) {
    return {
        restrict: "E",
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            treeData: "=",
            onNodeClick: "=",
            configure: "=",
            drop: "=",
            onDbClick: "=",
            onShow:"=",
            conditionConfig:"="
        },
        template: '<div id="rootDiv" style="text-align:center"></div>',
        link: function (scope, element, attrs) {
            console.log(scope.treeData);
            var parentElem = document.getElementById("rootDiv");
            //var parentElem = angular.element(element)[0];
            scope.$watch('treeData', function (treeData) {
                if (treeData) {
                    console.log(treeData);
                    renderTree(scope, parentElem, treeData);
                    $compile(element.contents())(scope);
                }
            }, true);
        },
        controller: function ($scope, $element) {
            $scope.nodes = {};
        }
    }

    function renderTree(scope, element, nodeData) {
        element.innerHTML = "";
        traversNode(scope, element, nodeData);
    }

    function traversNode(scope, element, node, parent, treeType, siblingIndex, siblingDepth) {
        if (!node.isVisible) return;
        if(!node) return;
        scope.nodes[node.id] = node;
        var nodeElem = element;
        switch (node.type){
            case "root":
                nodeElem = addRootNode(node, parent, nodeElem);
                break;
            case "menu":
                nodeElem = addMenuNode(scope, node, parent, nodeElem, siblingIndex);
                break;
            case "repeat":
                nodeElem = addRepeatNode(scope, node, parent, nodeElem, element);
                break;
            case "sequence":
                nodeElem = addSequenceNode(scope, node, parent, nodeElem);
                break;
            default:
                if (siblingIndex === undefined) {
                    nodeElem = addGeneralNode(node, parent, nodeElem);
                } else {
                    switch (treeType)
                    {
                        case "menu":
                            nodeElem = addMenuItemNode(node, parent, siblingIndex, nodeElem);
                            break;
                        case "repeat":
                            nodeElem = addRepeatItemNode(node, parent, nodeElem);
                            break;
                        case "sequence":
                            nodeElem = addSequenceItemNode(node, parent, siblingIndex, nodeElem);
                            break;
                        default:
                    }
                }
        }
        nodeElem = addChildNode(scope, node, parent, nodeElem, treeType);
        return addPlaceholderNode(node, parent, siblingDepth, nodeElem);
    }

    function isMenuNode(node){
        return node.type === 'menu';
    }

    function isRepeatNode(node){
        return node.type === 'repeat';
    }
    function isSequenceNode(node) {
        return node.type === 'sequence';
    }
    function createEmptyNode() {
        return {
            id: "",
            name: "",
            icon: "empty",
            displayText: "",
            type: "empty",
            cssClass: "",
            isVisible: true,
            parent: "",
            items: [],
            child: null
        }
    }

    function addVerticalLine(targetElement, bottom, hight,nodeType,parent) {
        if (!targetElement) return;
        var vrLineElem = document.createElement("div");
        vrLineElem.classList.add("line");
        vrLineElem.classList.add("vertical");

        if (nodeType=='sequence') {
            vrLineElem.classList.add("sequence-vertical");
        }

        if (parent && parent.type=='sequence') {
            vrLineElem.classList.add("sequence-item-vertical");
        }

        if(bottom)
            vrLineElem.classList.add("bottom");
        else
            vrLineElem.classList.add("top");
        if (hight) {
            console.log(hight);
            //targetElement.style.minHeight = 270 + (hight * 117) + "px";
        }

            //targetElement.classList.add(hight + "x");

        targetElement.appendChild(vrLineElem);
    }

    function createNodeElement(node, parent, isPlaceholder, index) {
        var nodeElem = document.createElement("div");
        var nodeContentElem = document.createElement("div");
        var variableElem=document.createElement("div");
        var iconElem = document.createElement("div");
        //var textElem = document.createElement("p");

        if(node.type == 'menu') {
            var loopCount = document.createElement("div");
            loopCount.classList.add("loopcount");
            if (node.data.type6.loop == 'count') {
                var loopCountText = document.createTextNode('Repeat X'+node.data.type6.loopCount);
                loopCount.appendChild(loopCountText);
            }
            else if (node.data.type6.loop == 'while') {
                var loopCountText = document.createTextNode('Repeat while '+node.data.type6.loopWhile);
                loopCount.appendChild(loopCountText);
            }
            else if (node.data.type6.loop == 'endless') {
                var loopCountText = document.createTextNode('Endless repeat');
                loopCount.appendChild(loopCountText);
            }
            nodeContentElem.appendChild(loopCount);
        }

        var textElem;
        if (node.type == 'root') {
            textElem = document.createElement("p");
            var textNode = document.createTextNode(node.displayText);
            textElem.appendChild(textNode);
            iconElem.classList.add('red');
        } else{
            textElem = document.createElement("i");
            textElem.classList.add("fa");
            textElem.classList.add(node.icon);
            textElem.classList.add("fa-4x");
        }

        nodeElem.classList.add('node');
        nodeContentElem.classList.add('node-content');
        variableElem.classList.add('variable-item');
        iconElem.classList.add('icon');

        if (node.name == 'menu' || node.name == 'case' || node.name == 'sequence' || (node.name == 'test' && node.items.length < 2)) {
            iconElem.classList.add('dropable');
        }

        if((node.child != null && !node.child.isVisible) || (node.type == 'menu' && node.itemHidden)) {
            iconElem.classList.add('grey');
        }
        //iconElem.classList.add(node.icon);
        //textElem.appendChild(document.createTextNode(node.displayText));

        if(isPlaceholder) {
            var parentNode = parent ? 'nodes[' + parent.id  + ']': null;
            iconElem.setAttribute('context-menu', 'onShow('+parentNode+','+ 0 +','+ null +')');
            if (node.type == 'repeatChild') {
                //parentNode.test="dhfbdf";
                var repeatNode = angular.copy(parentNode);
                repeatNode.type = 'repeatChild';
                iconElem.setAttribute('jqyoui-droppable', '{multiple:true,onDrop:' + "'" + 'drop(event, context, '+ parentNode +', '+ repeatNode +')' + "'" + '}');
            }
            else {
                iconElem.setAttribute('jqyoui-droppable', '{multiple:true,onDrop:' + "'" + 'drop(event, context, '+ parentNode +', '+ null +')' + "'" + '}');
            }
            iconElem.setAttribute('data-drop', 'true');
            iconElem.setAttribute('data-target', 'menu');
            iconElem.setAttribute('data-jqyoui-options', 'optionsList1');
            iconElem.classList.add('empty');
        } else if(isMenuNode(node) || isSequenceNode(node)) {
            iconElem.setAttribute('context-menu', 'onShow(nodes[' + parent.id  + '], '+ 0 +', nodes[' + node.id  + '])');
            iconElem.setAttribute('jqyoui-droppable', '{multiple:true,onDrop:' + "'" + 'drop(event, context, nodes[' + parent.id  + '], nodes[' + node.id  + '])' + "'" + '}');
            iconElem.setAttribute('data-drop', 'true');
            iconElem.setAttribute('data-target', 'menu');
            iconElem.setAttribute('data-jqyoui-options', 'optionsList1');
            iconElem.setAttribute('ng-click', 'onNodeClick(nodes[' + node.id + '])');
            iconElem.setAttribute('ng-dblclick', 'onDbClick(nodes[' + node.id + '])');
            iconElem.classList.add('icon-container');
        }
        else {
            if (node.type !== 'root') {
                iconElem.setAttribute('context-menu', 'onShow(nodes[' + parent.id  + '], '+ index +', nodes[' + node.id  + '])');
                iconElem.setAttribute('data-target', 'menu');
            }
            else {
                iconElem.setAttribute('context-menu', 'onShow(undefined, '+ 0 +', nodes[' + node.id  + '])');
                iconElem.setAttribute('data-target', 'root-menu');
            }
            iconElem.setAttribute('ng-click', 'onNodeClick(nodes[' + node.id + '])');
            iconElem.setAttribute('ng-dblclick', 'onDbClick(nodes[' + node.id + '])');
            iconElem.classList.add('icon-container');
        }

        iconElem.appendChild(textElem);

        var displaytext;

        switch (node.type){
            case "play":
                if (node.data.type6.ftpVar) {
                    displayText = node.data.type6.ftpVarSelect=="" ? 'var = ?' :'var = ' + node.data.type6.ftpVarSelect;
                }
                else {
                    displayText = node.data.type6.fileName==""? 'Play file(?)' : node.data.type6.fileName;
                }
                break;

            case "record":
                if (node.data.type6.riVar) {
                    displayText = node.data.type6.riVarSelect=="" ? 'var = ?' :'var = ' + node.data.type6.riVarSelect;
                }
                else {
                    displayText = node.data.type6.fileName==""? 'Record file(?)' : node.data.type6.fileName;
                }
                break;

            case "menu":
                if (node.data.type6.ftpVar) {
                    displayText = node.data.type6.ftpVarSelect=="" ? 'var = ?' :'var = ' + node.data.type6.ftpVarSelect;
                }
                else {
                    if(node.name == 'menu') {
                        displayText = node.data.type6.fileName==""? 'Menu(?)' : 'Menu ('+node.data.type6.fileName+')';
                    }
                    if(node.name == 'case') {
                        displayText = node.data.type6.variable==''? 'Case(?)' : ''+node.data.type6.variable+'?'
                    }
                    if(node.name == 'test') {
                        displayText = node.data.type6.expression==''? 'Test(?)' :''+node.data.type6.expression+'?';
                    }
                }
                break;

            case "repeat":
                if (node.data.type6.looptype == 'endless') {
                    displayText = 'Endless loop';
                }
                if (node.data.type6.looptype == 'count') {
                    displayText = 'Loop ' + node.data.type6.count + ' times';
                }
                if (node.data.type6.looptype == 'while') {
                    displayText = 'Repeat while '+node.data.type6.whileCondition+'';
                }
                break;

            case "getKey":
                displayText = 'Get '+node.data.type6.maxKey+' tone(s)';
                displayText = node.data.type6.variable==''? displayText: displayText + '->' + node.data.type6.variable;
                break;

            case "dial":
                if(node.data.type6.variable) {
                    displayText = 'Dial ' + node.data.type6.variableVar;
                }
                else {
                    displayText = 'Dial '+ node.data.type6.dial;
                }
                break;

            case "let":
                if (node.data.type6.variable == 'module') {
                    displayText = node.data.type6.variableModVar==''? 'Let(?)': 'Let '+node.data.type6.variableModVar+' = '+ node.data.type6.expression +'?';
                }
                else {
                    displayText = node.data.type6.variableSysVar==''? 'Let(?)': 'Let '+node.data.type6.variableSysVar+' = '+ node.data.type6.expression +'?';
                }
                break;

            case "week":
                if (node.data.type6.variable) {
                    displayText = 'var = ' + node.data.type6.variableSelect;
                }
                else {
                    displayText = node.data.type6.checkFile==''? 'Check week(?)': node.data.type6.checkFile;
                }
                break;

            case "year":
                if (node.data.type6.variable) {
                    displayText = 'var = ' + node.data.type6.variableSelect;
                }
                else {
                    displayText = node.data.type6.checkFile==''? 'Check year(?)': node.data.type6.checkFile;
                }
                break;

            case "exec":
                if(node.data.type6.variable) {
                    displayText = 'var = ' + node.data.type6.variableVar;
                }
                else {
                    displayText = node.data.type6.command==''? 'Exec(?)': node.data.type6.command;
                }
                break;

            case "do":
                displayText = node.data.type6.doFileName == '' ? 'Do(?)' : 'Do ' + node.data.type6.doFileName;
                break;

            case "sequence":
                displayText = 'sequence';
                break;

            default:
                displayText = ''

        }
        var variableTextNode = document.createTextNode(displayText);
        variableElem.appendChild(variableTextNode);
        variableElem.setAttribute('uib-tooltip', displayText);


        nodeContentElem.appendChild(variableElem);
        nodeContentElem.appendChild(iconElem);
        if (parent && parent.type == 'menu' && node.type != 'empty' && parent.child !== node) {
            if (parent.items.length > 1) {
                nodeElem.style.minHeight = 200 +"px";
                var siblingdepth = getNestedMenuItemsDepth(parent);
                nodeElem.style.minHeight = 200 + (siblingdepth * 130) + "px";
            }

            //nodeElem.classList.add("test-menu");


            var conditionElem = document.createElement("div");
            var conditionTextNode = document.createTextNode(node.enterCondition);
            var conditionbadge = document.createElement("span");
            conditionbadge.classList.add("badge");
            conditionbadge.classList.add("pointer");
            conditionElem.setAttribute('ng-dblclick', 'conditionConfig(nodes[' + node.id + '], nodes[' + parent.id  + '])');
            conditionbadge.appendChild(conditionTextNode);
            conditionElem.appendChild(conditionbadge);
            conditionElem.classList.add('condition');
            nodeElem.appendChild(conditionElem);
        }
        if (parent && parent.type == 'sequence' && node.type != 'empty' && parent.child !== node) {
            if (parent.items.length > 1) {
                nodeElem.classList.add("sequence-node");
            }
        }

        nodeElem.appendChild(nodeContentElem);
        return nodeElem;
    }

    function addRootNode(node, parent, targetElement) {
        var nodeElem = createNodeElement(node, parent);
        targetElement.appendChild(nodeElem);
        return nodeElem;
    }

    function addGeneralNode(node, parent, targetElement){
        var nodeElem = createNodeElement(node, parent);
        addVerticalLine(nodeElem);
        targetElement.appendChild(nodeElem);
        return nodeElem;
    }

    function addMenuNode(scope, node, parent, targetElement, siblingIndex){
        var menuElem = createNodeElement(node, parent);

        if (parent.type == 'menu' && node.parentReference == 'menu' && parent.child !=node) {
            var hrLineTop = document.createElement("div");
            var hrLineBottom = document.createElement("div");
            if (parent.items.length > 1) {
                hrLineTop.classList.add("line");
                hrLineTop.classList.add("horizontal");
                hrLineTop.classList.add("top");
                hrLineBottom.classList.add("line");
                hrLineBottom.classList.add("horizontal")
                hrLineBottom.classList.add("bottom");
                if (siblingIndex == 0) {
                    hrLineTop.classList.add("first-child");
                    hrLineBottom.classList.add("first-child");
                }
                else if (siblingIndex == parent.items.length - 1) {
                    hrLineTop.classList.add("last-child");
                    hrLineBottom.classList.add("last-child");
                }
                menuElem.appendChild(hrLineTop);
                menuElem.appendChild(hrLineBottom);
            }
        }

        var menuItemsVertical = document.createElement("div");
        addVerticalLine(menuElem);
        if (node.items.length > 1) {
            menuElem.classList.add("menu");
        }
        targetElement.appendChild(menuElem);
        if (node.items && node.items.length) {
            addVerticalLine(menuElem, true);
            var itemsElem = document.createElement("div");
            itemsElem.classList.add("items");
            itemsElem.classList.add("menu-items");

            menuItemsVertical.classList.add("line");
            menuItemsVertical.classList.add("vertical");
            menuItemsVertical.classList.add("menu-items-vertical-line");

            itemsElem.appendChild(menuItemsVertical);
            menuElem.appendChild(itemsElem);
            var maxNestedLevel = getNestedMenuItemsDepth(node);
            angular.forEach(node.items, function (item, index) {
                if (!item.isVisible) return;
                var itemElem = traversNode(scope, itemsElem, item, node, node.type, index, maxNestedLevel);
                addVerticalLine(itemElem, true);
            });
        }
        return menuElem;
    }

    function addMenuItemNode(node, parent, siblingIndex, targetElement) {
        var hrLineTop = document.createElement("div");
        var hrLineBottom = document.createElement("div");
        if (parent.items.length > 1) {
            hrLineTop.classList.add("line");
            hrLineTop.classList.add("horizontal");
            hrLineTop.classList.add("top");
            hrLineBottom.classList.add("line");
            hrLineBottom.classList.add("horizontal");
            hrLineBottom.classList.add("bottom");
            if (siblingIndex == 0) {
                hrLineTop.classList.add("first-child");
                hrLineBottom.classList.add("first-child");
            }
            else if (siblingIndex == parent.items.length - 1) {
                hrLineTop.classList.add("last-child");
                hrLineBottom.classList.add("last-child");
            }
        }


        var itemElem = createNodeElement(node, parent, 0, siblingIndex);
        addVerticalLine(itemElem, undefined, undefined, undefined);
        itemElem.appendChild(hrLineTop);
        itemElem.appendChild(hrLineBottom);
        targetElement.appendChild(itemElem);
        return itemElem;
    }

    function addSequenceNode(scope, node, parent, targetElement) {
        var menuElem = createNodeElement(node, parent);

        var sequenceItemsVertical = document.createElement("div");

        addVerticalLine(menuElem, undefined, undefined, node.type, parent);
        if (node.items.length > 1) {
            menuElem.classList.add("sequence");
        }
        targetElement.appendChild(menuElem);
        if (node.items && node.items.length) {
            addVerticalLine(menuElem, true, undefined, node.type);
            var itemsElem = document.createElement("div");
            itemsElem.classList.add("items");
            itemsElem.classList.add("sequence-items");


            sequenceItemsVertical.classList.add("line");
            sequenceItemsVertical.classList.add("vertical");
            sequenceItemsVertical.classList.add("sequence-items-vertical-line");


            menuElem.appendChild(itemsElem);

            var maxNestedLevel = getNestedMenuItemsDepth(node);
            angular.forEach(node.items, function (item, index) {
                if (!item.isVisible) return;
                var itemElem = traversNode(scope, itemsElem, item, node, node.type, index, maxNestedLevel);
                addVerticalLine(itemElem, true, undefined, node.type, parent);
            });
            itemsElem.appendChild(sequenceItemsVertical);
        }
        return menuElem;
    }
    function getMenuWidth(node) {
        var width = 0;
        if (node.items) {
            if (node.type != 'sequence' && node.items.length > 1) {
                width = width + node.items.length - 1;
            }
            else {
                width = width + node.items.length;
            }

            node.items.forEach(function (item) {
                if (item.type == 'menu') {
                    if (item.items.length > 1) {
                        width = width + item.items.length + getMenuWidth(item);
                    }
                    else {
                        width = width + getMenuWidth(item);
                    }
                }
                else if (item.child != null) {
                    width = width + getMenuWidth(item.child);
                }
            })
        }
        else if (node.child != null) {
            width = width + getMenuWidth(node.child);
        }
        return width;
    }
    function addSequenceItemNode(node, parent, siblingIndex, targetElement) {
        var hrLineTop = document.createElement("div");
        var hrFirstChild = document.createElement("div");

        if (parent.items.length > 1) {
            hrLineTop.classList.add("line");
            hrLineTop.classList.add("horizontal");
            hrLineTop.classList.add("top");
            hrLineTop.classList.add("sequence-horaizontal");

            if (siblingIndex == 0) {
                hrLineTop.classList.add("first-child");
            }
            else if (siblingIndex == parent.items.length - 1) {
                hrLineTop.classList.add("last-child");
            }
        }

        var itemElem = createNodeElement(node, parent, 0, siblingIndex);
        addVerticalLine(itemElem, undefined, undefined, node.type, parent);
        if (parent.items.length > 1 && node.id == parent.items[0].id) {
            hrFirstChild.classList.add("line");
            hrFirstChild.classList.add("sequence-horaizontal-first-child");
            hrFirstChild.style.width = 64 + "px";
            if (parent.items.length > 1) {
                var menuwidth = getMenuWidth(parent);
                console.log('MENUWIDTH IS ' + menuwidth);
                //hrFirstChild.style.width = (parent.items.length * 42) + "px";
                hrFirstChild.style.width = (menuwidth * 95) + "px";
            }

            console.log(parent.items.length);
            itemElem.appendChild(hrFirstChild);
        }
        itemElem.appendChild(hrLineTop);
        targetElement.appendChild(itemElem);
        return itemElem;
    }


    function addRepeatNode(scope, node, parent, targetElement){
        var repeatElem = createNodeElement(node, parent);
        addVerticalLine(repeatElem);
        repeatElem.classList.add("repeat");
        targetElement.appendChild(repeatElem);


        if (node.items && node.items.length) {

            var lineHorizontalTop = document.createElement("div");
            var lineHorizontalTopRight = document.createElement("div");
            lineHorizontalTop.classList.add("line");
            lineHorizontalTop.classList.add("horizontal");
            lineHorizontalTop.classList.add("repeat-horizontal-top");

            lineHorizontalTopRight.classList.add("line");
            lineHorizontalTopRight.classList.add("horizontal");
            lineHorizontalTopRight.classList.add("repeat-horizontal-top-right");

            repeatElem.appendChild(lineHorizontalTop);
            repeatElem.appendChild(lineHorizontalTopRight);



            addVerticalLine(repeatElem, true);
            var itemsElem = document.createElement("div");
            itemsElem.classList.add("items");
            repeatElem.appendChild(itemsElem);
            var itemElem = traversNode(scope, itemsElem, node.items[0], node, node.type,null,null);
            addVerticalLine(itemElem, true);
        } else {
            repeatElem = addPlaceholderNode({child: null, type: 'repeatChild'}, node, 0, repeatElem);
        }
        return repeatElem;
    }

    function addRepeatItemNode(node, parent, targetElement) {
        var lineHorizontalBottom = document.createElement("div");
        var lineHorizontalTopRight = document.createElement("div");
        var repeatVerticalLeft = document.createElement("div");
        var repeatVerticalRight = document.createElement("div");
        repeatVerticalLeft.classList.add("line");
        repeatVerticalLeft.classList.add("vertical");
        repeatVerticalRight.classList.add("line");
        repeatVerticalRight.classList.add("vertical");
        repeatVerticalLeft.classList.add("repeat-vertical-left");
        repeatVerticalRight.classList.add("repeat-vertical-right");

        lineHorizontalTopRight.classList.add("line");
        lineHorizontalTopRight.classList.add("horizontal");
        lineHorizontalTopRight.classList.add("repeat-horizontal-child-top-right");

        lineHorizontalBottom.classList.add("line");
        lineHorizontalBottom.classList.add("horizontal");
        lineHorizontalBottom.classList.add("repeat-horizontal-bottom");
        var itemElem = createNodeElement(node, parent, 0);
        addVerticalLine(itemElem);
        itemElem.appendChild(repeatVerticalLeft);
        itemElem.appendChild(repeatVerticalRight);
        itemElem.appendChild(lineHorizontalTopRight);
        itemElem.appendChild(lineHorizontalBottom);
        targetElement.appendChild(itemElem);
        return itemElem;
    }

    function addChildNode(scope, node, parent, targetElement) {
        var childElem = document.createElement("div");
        childElem.classList.add("child");
        targetElement.appendChild(childElem);
        if(!node.child) return childElem;
        return traversNode(scope, childElem, node.child, node, node.type);
    }

    function addPlaceholderNode(node, parent, siblingDepth, targetElement) {
        if(node.child) return targetElement;
        else if (node.type == 'hang' || node.type == 'return' || node.type == 'sequence') return;
        var placeholderNode = createEmptyNode();
        placeholderNode.id = node.id;
        if (node.type == 'repeatChild') {
            placeholderNode.type = node.type;
        }
        var lineHeight = getLineHeight(node, parent, siblingDepth);
        if (placeholderNode.type == 'repeatChild') {
            var placeholderElem = createNodeElement(placeholderNode, parent, true);
        }
        else {
            var placeholderElem = createNodeElement(placeholderNode, node, true);
        }
        addVerticalLine(placeholderElem, false, lineHeight);
        targetElement.appendChild(placeholderElem);
        return placeholderElem;
    }

    function getNestedItemDepth(node) {
        if(!node) return 0;
        if (node.type != 'menu') {
            return getNestedItemDepth(node.child) + 1;
        }
        else if (node.type == 'menu') {
            return getNestedMenuItemsDepth(node) + getNestedItemDepth(node.child) + 3;
        }
    }

    function getNestedMenuItemsDepth(node) {
        if (!node || node.type !== 'menu') return 0;
        var maxDepth = 0;
        if (node && node.items && node.items.length) {
            node.items.forEach(function (item) {
                var depth = getNestedItemDepth(item);
                if (depth > maxDepth)
                    maxDepth = depth;
            });
        }
        return maxDepth;
    }

    function getLineHeight(node, parent, maxSiblingDepth) {
        if (!parent || parent.type !== 'menu') return 0;
        var paddingDepth = maxSiblingDepth - getNestedItemDepth(node);
        return paddingDepth > 0 ? paddingDepth : 0;
    }
});
