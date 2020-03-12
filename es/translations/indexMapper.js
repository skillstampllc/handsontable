import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.some";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { arrayFilter, arrayMap } from './../helpers/array';
import { getListWithRemovedItems, getListWithInsertedItems } from './maps/utils/visuallyIndexed';
import { rangeEach } from '../helpers/number';
import IndexToIndexMap from './maps/visualIndexToPhysicalIndexMap';
import SkipMap from './maps/skipMap';
import MapCollection from './mapCollection';
import localHooks from '../mixins/localHooks';
import { mixin } from '../helpers/object';
import { isDefined } from '../helpers/mixed';
/**
 * Index mapper manages the mappings provided by "smaller" maps called index map(s). Those maps provide links from
 * indexes (physical¹ or visual² depending on requirements) to another value. For example, we may link physical column
 * indexes with widths of columns. On every performed CRUD action such as insert column, move column and remove column
 * the value (column width) will stick to the proper index. The index mapper is used as the centralised source of truth
 * regarding row and column indexes (their sequence, information if they are skipped in the process of rendering,
 * values linked to them). It handles CRUD operations on indexes and translate the visual indexes to the physical
 * indexes and the other way round³. It has built in cache. Thus, this way, read operations are as fast as possible.
 * Cache updates are triggered only when the data or structure changes.
 *
 * ¹ Physical index is particular index from the sequence of indexes assigned to the data source rows / columns
 * (from 0 to n, where n is number of the cells on the axis).
 * ² Visual index is particular index from the sequence of indexes assigned to visible rows / columns
 * (from 0 to n, where n is number of the cells on the axis).
 * ³ It maps from visible row / column to its representation in the data source and the other way round.
 * For example, when we sorted data, our 1st visible row can represent 4th row from the original source data,
 * 2nd can be mapped to 3rd, 3rd to 2nd, etc. (keep in mind that indexes are represent from the zero).
 */

var IndexMapper =
/*#__PURE__*/
function () {
  function IndexMapper() {
    var _this = this;

    _classCallCheck(this, IndexMapper);

    /**
     * Map storing the sequence of indexes.
     *
     * @private
     * @type {VisualIndexToPhysicalIndexMap}
     */
    this.indexesSequence = new IndexToIndexMap();
    /**
     * Collection for different skip maps. Indexes marked as skipped in any map won't be rendered.
     *
     * @private
     * @type {MapCollection}
     */

    this.skipMapsCollection = new MapCollection();
    /**
     * Collection for another kind of maps.
     *
     * @private
     * @type {MapCollection}
     */

    this.variousMapsCollection = new MapCollection();
    /**
     * Cache for skip result for particular indexes.
     *
     * @private
     * @type {Array}
     */

    this.flattenSkipList = [];
    /**
     * Cache for list of not skipped indexes, respecting the indexes sequence.
     *
     * @private
     * @type {Array}
     */

    this.notSkippedIndexesCache = [];
    /**
     * Flag determining whether operations performed on index mapper were batched.
     *
     * @private
     * @type {Boolean}
     */

    this.isBatched = false;
    /**
     * Flag determining whether any action on indexes sequence or skipped indexes was performed.
     *
     * @private
     * @type {Boolean}
     */

    this.cachedIndexesChange = false;
    this.indexesSequence.addLocalHook('change', function () {
      _this.cachedIndexesChange = true; // Sequence of visible indexes might change.

      _this.updateCache();

      _this.runLocalHooks('change', _this.indexesSequence, null);
    });
    this.skipMapsCollection.addLocalHook('change', function (changedMap) {
      _this.cachedIndexesChange = true; // Number of visible indexes might change.

      _this.updateCache();

      _this.runLocalHooks('change', changedMap, _this.skipMapsCollection);
    });
    this.variousMapsCollection.addLocalHook('change', function (changedMap) {
      _this.runLocalHooks('change', changedMap, _this.variousMapsCollection);
    });
  }
  /**
   * Execute batch operations with updating cache.
   *
   * @param {Function} wrappedOperations Batched operations wrapped in a function.
   */


  _createClass(IndexMapper, [{
    key: "executeBatchOperations",
    value: function executeBatchOperations(wrappedOperations) {
      var actualFlag = this.isBatched;
      this.isBatched = true;
      wrappedOperations();
      this.isBatched = actualFlag;
      this.updateCache();
    }
    /**
     * Register map which provide some index mappings.
     *
     * @param {String} uniqueName Name of the index map. It should be unique.
     * @param {IndexMap} indexMap Registered index map updated on items removal and insertion.
     * @returns {IndexMap}
     */

  }, {
    key: "registerMap",
    value: function registerMap(uniqueName, indexMap) {
      if (this.skipMapsCollection.get(uniqueName) || this.variousMapsCollection.get(uniqueName)) {
        throw Error("Map with name \"".concat(uniqueName, "\" has been already registered."));
      }

      if (indexMap instanceof SkipMap) {
        this.skipMapsCollection.register(uniqueName, indexMap);
      } else {
        this.variousMapsCollection.register(uniqueName, indexMap);
      }

      var numberOfIndexes = this.getNumberOfIndexes();
      /*
        We initialize map ony when we have full information about number of indexes and the dataset is not empty.
        Otherwise it's unnecessary. Initialization of empty array would not give any positive changes. After initializing
        it with number of indexes equal to 0 the map would be still empty. What's more there would be triggered
        not needed hook (no real change have occurred). Number of indexes is known after loading data (the `loadData`
        function from the `Core`).
       */

      if (numberOfIndexes > 0) {
        indexMap.init(numberOfIndexes);
      }

      return indexMap;
    }
    /**
     * Unregister a map with given name.
     *
     * @param {String} name Name of the index map.
     */

  }, {
    key: "unregisterMap",
    value: function unregisterMap(name) {
      this.skipMapsCollection.unregister(name);
      this.variousMapsCollection.unregister(name);
    }
    /**
     * Get physical index by its visual index.
     *
     * @param {Number} visualIndex Visual index.
     * @return {Number|null} Returns translated index mapped by passed visual index.
     */

  }, {
    key: "getPhysicalIndex",
    value: function getPhysicalIndex(visualIndex) {
      var visibleIndexes = this.getNotSkippedIndexes();
      var numberOfVisibleIndexes = visibleIndexes.length;
      var physicalIndex = null;

      if (visualIndex < numberOfVisibleIndexes) {
        physicalIndex = visibleIndexes[visualIndex];
      }

      return physicalIndex;
    }
    /**
     * Get visual index by its physical index.
     *
     * @param {Number} physicalIndex Physical index to search.
     * @returns {Number|null} Returns a visual index of the index mapper.
     */

  }, {
    key: "getVisualIndex",
    value: function getVisualIndex(physicalIndex) {
      var visibleIndexes = this.getNotSkippedIndexes();
      var visualIndex = visibleIndexes.indexOf(physicalIndex);

      if (visualIndex !== -1) {
        return visualIndex;
      }

      return null;
    }
    /**
     * Set default values for all stored index maps.
     *
     * @param {Number} [length] Destination length for all stored index maps.
     */

  }, {
    key: "initToLength",
    value: function initToLength() {
      var _this2 = this;

      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getNumberOfIndexes();
      this.flattenSkipList = [];
      this.notSkippedIndexesCache = _toConsumableArray(new Array(length).keys());
      this.executeBatchOperations(function () {
        _this2.indexesSequence.init(length);

        _this2.skipMapsCollection.initEvery(length);

        _this2.variousMapsCollection.initEvery(length);
      });
      this.runLocalHooks('init');
    }
    /**
     * Get all indexes sequence.
     *
     * @returns {Array} Physical indexes.
     */

  }, {
    key: "getIndexesSequence",
    value: function getIndexesSequence() {
      return this.indexesSequence.getValues();
    }
    /**
     * Set completely new indexes sequence.
     *
     * @param {Array} indexes Physical indexes.
     */

  }, {
    key: "setIndexesSequence",
    value: function setIndexesSequence(indexes) {
      this.indexesSequence.setValues(indexes);
    }
    /**
     * Get all indexes NOT skipped in the process of rendering.
     *
     * @param {Boolean} [readFromCache=true] Determine if read indexes from cache.
     * @returns {Array} Physical indexes.
     */

  }, {
    key: "getNotSkippedIndexes",
    value: function getNotSkippedIndexes() {
      var _this3 = this;

      var readFromCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (readFromCache === true) {
        return this.notSkippedIndexesCache;
      }

      return arrayFilter(this.getIndexesSequence(), function (index) {
        return _this3.isSkipped(index) === false;
      });
    }
    /**
     * Get length of all indexes NOT skipped in the process of rendering.
     *
     * @returns {Number}
     */

  }, {
    key: "getNotSkippedIndexesLength",
    value: function getNotSkippedIndexesLength() {
      return this.getNotSkippedIndexes().length;
    }
    /**
     * Get number of all indexes.
     *
     * @returns {Number}
     */

  }, {
    key: "getNumberOfIndexes",
    value: function getNumberOfIndexes() {
      return this.getIndexesSequence().length;
    }
    /**
     * Move indexes in the index mapper.
     *
     * @param {Number|Array} movedIndexes Visual index(es) to move.
     * @param {Number} finalIndex Visual index index being a start index for the moved element.
     */

  }, {
    key: "moveIndexes",
    value: function moveIndexes(movedIndexes, finalIndex) {
      var _this4 = this;

      if (typeof movedIndexes === 'number') {
        movedIndexes = [movedIndexes];
      }

      var physicalMovedIndexes = arrayMap(movedIndexes, function (visualIndex) {
        return _this4.getPhysicalIndex(visualIndex);
      });
      var notSkippedIndexesLength = this.getNotSkippedIndexesLength();
      var movedIndexesLength = movedIndexes.length; // Removing indexes without re-indexing.

      var listWithRemovedItems = getListWithRemovedItems(this.getIndexesSequence(), physicalMovedIndexes); // When item(s) are moved after the last visible item we assign the last possible index.

      var destinationPosition = notSkippedIndexesLength - movedIndexesLength; // Otherwise, we find proper index for inserted item(s).

      if (finalIndex + movedIndexesLength < notSkippedIndexesLength) {
        // Physical index at final index position.
        var physicalIndex = listWithRemovedItems.filter(function (index) {
          return _this4.isSkipped(index) === false;
        })[finalIndex];
        destinationPosition = listWithRemovedItems.indexOf(physicalIndex);
      } // Adding indexes without re-indexing.


      this.setIndexesSequence(getListWithInsertedItems(listWithRemovedItems, destinationPosition, physicalMovedIndexes));
    }
    /**
     * Get whether index is skipped in the process of rendering.
     *
     * @param {Number} physicalIndex Physical index.
     * @returns {Boolean}
     */

  }, {
    key: "isSkipped",
    value: function isSkipped(physicalIndex) {
      return this.getFlattenSkipList()[physicalIndex] || false;
    }
    /**
     * Insert new indexes and corresponding mapping and update values of the others, for all stored index maps.
     *
     * @private
     * @param {Number} firstInsertedVisualIndex First inserted visual index.
     * @param {Number} amountOfIndexes Amount of inserted indexes.
     */

  }, {
    key: "insertIndexes",
    value: function insertIndexes(firstInsertedVisualIndex, amountOfIndexes) {
      var _this5 = this;

      var nthVisibleIndex = this.getNotSkippedIndexes()[firstInsertedVisualIndex];
      var firstInsertedPhysicalIndex = isDefined(nthVisibleIndex) ? nthVisibleIndex : this.getNumberOfIndexes();
      var insertionIndex = this.getIndexesSequence().includes(nthVisibleIndex) ? this.getIndexesSequence().indexOf(nthVisibleIndex) : this.getNumberOfIndexes();
      var insertedIndexes = arrayMap(new Array(amountOfIndexes).fill(firstInsertedPhysicalIndex), function (nextIndex, stepsFromStart) {
        return nextIndex + stepsFromStart;
      });
      this.executeBatchOperations(function () {
        _this5.indexesSequence.insert(insertionIndex, insertedIndexes);

        _this5.skipMapsCollection.insertToEvery(insertionIndex, insertedIndexes);

        _this5.variousMapsCollection.insertToEvery(insertionIndex, insertedIndexes);
      });
    }
    /**
     * Remove some indexes and corresponding mappings and update values of the others, for all stored index maps.
     *
     * @private
     * @param {Array} removedIndexes List of removed indexes.
     */

  }, {
    key: "removeIndexes",
    value: function removeIndexes(removedIndexes) {
      var _this6 = this;

      this.executeBatchOperations(function () {
        _this6.indexesSequence.remove(removedIndexes);

        _this6.skipMapsCollection.removeFromEvery(removedIndexes);

        _this6.variousMapsCollection.removeFromEvery(removedIndexes);
      });
    }
    /**
     * Get list of values, which represent result if index was skipped in any of skip collections.
     *
     * @private
     * @param {Boolean} [readFromCache=true] Determine if read indexes from cache.
     * @returns {Array}
     */

  }, {
    key: "getFlattenSkipList",
    value: function getFlattenSkipList() {
      var readFromCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (readFromCache === true) {
        return this.flattenSkipList;
      }

      if (this.skipMapsCollection.getLength() === 0) {
        return [];
      }

      var result = [];
      var particularSkipsLists = arrayMap(this.skipMapsCollection.get(), function (skipList) {
        return skipList.getValues();
      });
      rangeEach(this.indexesSequence.getLength(), function (physicalIndex) {
        result[physicalIndex] = particularSkipsLists.some(function (particularSkipsList) {
          return particularSkipsList[physicalIndex];
        });
      });
      return result;
    }
    /**
     * Rebuild cache for some indexes. Every action on indexes sequence or skipped indexes by default reset cache,
     * thus batching some index maps actions is recommended.
     *
     * @param {Boolean} [force=false] Determine if force cache update.
     * @private
     */

  }, {
    key: "updateCache",
    value: function updateCache() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (force === true || this.isBatched === false && this.cachedIndexesChange === true) {
        this.flattenSkipList = this.getFlattenSkipList(false);
        this.notSkippedIndexesCache = this.getNotSkippedIndexes(false);
        this.cachedIndexesChange = false;
        this.runLocalHooks('cacheUpdated');
      }
    }
  }]);

  return IndexMapper;
}();

mixin(IndexMapper, localHooks);
export default IndexMapper;