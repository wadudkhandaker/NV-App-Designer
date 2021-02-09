app.controller('doScriptController', ['$scope', '$state',
    function ($scope, $state) {

        $scope.sidebarCollapse = false;
        $scope.toggleBtnClicked = function () {
            $scope.sidebarCollapse = !$scope.sidebarCollapse;
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
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
                                ),

                        //repeat node

                         new Node({ name: "repeat", type: "repeat", displayText: "repeat", isVisible: true, isEnable: true, icon: "fa-repeat" },
                         {
                             type6: {
                                 looptype: "endless",
                                 count: 1,
                                 whileCondition: "",
                                 consoleoutput: ""
                             }
                         },
                        null,
                        [])
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
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
                                            consoleOutput: ""
                                        }
                                    },
                                    null
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
                                            doFileName: ""
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
                                            consoleOutput: ""
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

                /*
                shedule:
                    [
                        new Node({ color: "purple", icon: "icon-3.png", type: 3 }, [new Node({ color: "empty" }), new Node({ color: "empty" })]),
                        new Node({ color: "purple", icon: "icon-4.png", type: 4 }, [new Node({ color: "empty" }), new Node({ color: "empty" }), new Node({ color: "empty" })]),
                    ],

                configuration:
                    [
                        new Node({ color: "gray", icon: "icon-5.png", type: 5 }, [new Node({ color: "empty" })]),
                        new Node({ color: "gray", icon: "icon-6.png", type: 6 }, [new Node({ color: "empty" })]),
                    ],

                flowcontrol:
                    [
                        new Node({ color: "red", icon: "icon-7.png", type: 7 }, []),
                        new Node({ color: "red", icon: "icon-8.png", type: 8 }, []),
                    ],
                */
            },

            tree: [
                    new Node(
                                {
                                    id: "0",
                                    name: "root",
                                    type: "root",
                                    icon: "red",
                                    displayText: "Start",
                                    isVisible: true,
                                    isEnable: true,

                                },
                                {

                                },
                                null
                            )
            ],
        };
    }]);
