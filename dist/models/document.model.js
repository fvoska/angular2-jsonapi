"use strict";
var links_model_1 = require("./links.model");
var DocumentModel = (function () {
    function DocumentModel(body) {
        this._links = new links_model_1.LinksModel;
        this._links.updateLinks(body.links);
    }
    Object.defineProperty(DocumentModel.prototype, "links", {
        get: function () {
            return this._links;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentModel.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    return DocumentModel;
}());
exports.DocumentModel = DocumentModel;
//# sourceMappingURL=document.model.js.map