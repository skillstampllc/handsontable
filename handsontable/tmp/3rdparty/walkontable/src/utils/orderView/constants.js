"use strict";

exports.__esModule = true;
/**
 * Describes that ViewSizeSet instance doesn't share sizes with another
 * instance (root node can contain only one type of children nodes).
 *
 * @type {number}
 */
const WORKING_SPACE_ALL = 0;
/**
 * Describes that ViewSizeSet instance share sizes with another instance and
 * set working space for this instance to 'top' (root node can contain multiple
 * types of children and this instance will be occupied top space of the root node).
 *
 * @type {number}
 */
exports.WORKING_SPACE_ALL = WORKING_SPACE_ALL;
const WORKING_SPACE_TOP = 1;
/**
 * Describes that ViewSizeSet instance share sizes with another instance and
 * set working space for this instance to 'bottom' (root node can contain multiple
 * types of children and this instance will be occupied bottom space of the root node).
 *
 * @type {number}
 */
exports.WORKING_SPACE_TOP = WORKING_SPACE_TOP;
const WORKING_SPACE_BOTTOM = 2;
exports.WORKING_SPACE_BOTTOM = WORKING_SPACE_BOTTOM;