/**
 * Finds the child nodes of a given node
 * @author Martin Koster
 * Created on 26/05/15.
 */
(function(module) {
    'use strict';

    var _ = require('lodash'),
        ScopeUtils = require('../utils/ScopeUtils');

    var ChildNodeFinder = function(astNode) {
        var body = astNode.body;

        /* The actual processing may in some cases require the body of the node, which is itself a node */
        this._astNode = body && _.isArray(body) ? body : astNode;
    };

    ChildNodeFinder.prototype.find = function() {
        var childNodes = [];
        _.forOwn(this._astNode, function (child) {
            childNodes.push(child);
        }, this);
        return childNodes;
    };

    module.exports = ChildNodeFinder;
})(module);