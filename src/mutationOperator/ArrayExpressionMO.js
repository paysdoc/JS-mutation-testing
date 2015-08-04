/**
 * This command creates mutations on a given array
 * Created by Martin Koster on 2/12/15.
 */
(function(module) {
    'use strict';

    var _ = require('lodash'),
        MutationUtils = require('../utils/MutationUtils'),
        MutationOperator = require('./MutationOperator');

    function ArrayExpressionMO (subTree, index) {
        MutationOperator.call(this, subTree);
        this._index = index;
    }

    ArrayExpressionMO.prototype.apply = function () {
        var elements = this._astNode.elements,
            mutation;

        if (!this._original) {
            mutation =  MutationUtils.createAstArrayElementDeletionMutation(elements, this._index);
            this._original = elements.splice(this._index, 1)[0];
        }
        return mutation;
    };

    ArrayExpressionMO.prototype.revert = function() {
        if (this._original) {
            this._astNode.elements.splice(this._index, 0, this._original);
        }
        this._original = null;
    };

    module.exports.code = 'ARRAY';
    module.exports.create = function(subTree) {
        var mos = [];

        _.forEach(subTree.elements, function(element, i) {
            mos.push(new ArrayExpressionMO(subTree, i));
        });

        return mos;
    };

})(module);
