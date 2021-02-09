app.directive("noContextMenu", function () {
    contextmenu = {};
    contextmenu.restrict = "AE";
    contextmenu.scope = { "isVisible": "=" };
    contextmenu.link = function (lScope, lElem, lAttr) {
        lElem.on("contextmenu", function (e) {
            e.preventDefault();
        });

        lElem.on("mouseleave", function (e) {

        });
    };
    return contextmenu;
});