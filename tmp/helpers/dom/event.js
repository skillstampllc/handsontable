"use strict";

exports.__esModule = true;
exports.stopImmediatePropagation = stopImmediatePropagation;
exports.isImmediatePropagationStopped = isImmediatePropagationStopped;
exports.stopPropagation = stopPropagation;
exports.pageX = pageX;
exports.pageY = pageY;
exports.isRightClick = isRightClick;
exports.isLeftClick = isLeftClick;

/**
 * Prevent other listeners of the same event from being called.
 *
 * @param {Event} event The mouse event object.
 */
function stopImmediatePropagation(event) {
  event.isImmediatePropagationEnabled = false;
  event.cancelBubble = true;
}
/**
 * Check if event was stopped by `stopImmediatePropagation`.
 *
 * @param {Event} event The mouse event object.
 * @returns {boolean}
 */


function isImmediatePropagationStopped(event) {
  return event.isImmediatePropagationEnabled === false;
}
/**
 * Prevent further propagation of the current event (prevent bubbling).
 *
 * @param event {Event}
 */


function stopPropagation(event) {
  // ie8
  // http://msdn.microsoft.com/en-us/library/ie/ff975462(v=vs.85).aspx
  if (typeof event.stopPropagation === 'function') {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}
/**
 * Get horizontal coordinate of the event object relative to the whole document.
 *
 * @param {Event} event
 * @returns {Number}
 */


function pageX(event) {
  if (event.pageX) {
    return event.pageX;
  }

  var rootWindow = event.target.ownerDocument.defaultView;
  return event.clientX + getWindowScrollLeft(rootWindow);
}
/**
 * Get vertical coordinate of the event object relative to the whole document.
 *
 * @param {Event} event
 * @returns {Number}
 */


function pageY(event) {
  if (event.pageY) {
    return event.pageY;
  }

  var frame = event.target.ownerDocument.defaultView;
  var offset = getWindowScrollTop(frame);
  frame = getParentWindow(frame);

  while (frame) {
    offset -= getWindowScrollTop(frame);
    frame = getParentWindow(frame);
  }

  return event.clientY + offset;
}
/**
 * Check if provided event was triggered by clicking the right mouse button.
 *
 * @param {Event} event The mouse event object.
 * @returns {boolean}
 */


function isRightClick(event) {
  return event.button === 2;
}
/**
 * Check if provided event was triggered by clicking the left mouse button.
 *
 * @param {Event} event The mouse event object.
 * @returns {boolean}
 */


function isLeftClick(event) {
  return event.button === 0;
}