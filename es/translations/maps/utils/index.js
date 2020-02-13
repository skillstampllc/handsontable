import "core-js/modules/es.array.iterator";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import { getDecreasedIndexes, getIncreasedIndexes } from './actionsOnIndexes';
import { getListWithInsertedItems as visualStrategyInsert, getListWithRemovedItems as visualStrategyRemove } from './visuallyIndexed';
import { getListWithInsertedItems as physicalStrategyInsert, getListWithRemovedItems as physicalStrategyRemove } from './physicallyIndexed';
var alterStrategies = new Map([['visually', {
  getListWithInsertedItems: visualStrategyInsert,
  getListWithRemovedItems: visualStrategyRemove
}], ['physically', {
  getListWithInsertedItems: physicalStrategyInsert,
  getListWithRemovedItems: physicalStrategyRemove
}]]);

var alterUtilsFactory = function alterUtilsFactory(indexationStrategy) {
  if (alterStrategies.has(indexationStrategy) === false) {
    throw new Error("Alter strategy for '".concat(indexationStrategy, "' indexed map does not exist."));
  }

  return alterStrategies.get(indexationStrategy);
};

export { getDecreasedIndexes, getIncreasedIndexes, alterUtilsFactory };