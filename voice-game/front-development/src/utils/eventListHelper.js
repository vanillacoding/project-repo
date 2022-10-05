/**
 *
 * @param {array} eventList List of registered event information.
 * @param {object} eventTarget Target to which the event is registered.
 * @param {string} eventType Event type to be registered.
 * @param {function} callback Functions executed when an event is occured.
 */
export const addEventHelper = (eventList, eventTarget, eventType, callback) => {
  eventTarget.addEventListener(eventType, callback, false);
  eventList.push({
    eventTarget,
    eventType,
    callback,
  });
};

/**
 *
 * @param {array} eventList Array contains objects containing information about event removal.
 */
export const removeEventHelper = (eventList) => {
  for (const eventInfo of eventList) {
    const {
      eventTarget,
      eventType,
      callback,
    } = eventInfo;

    eventTarget.removeEventListener(eventType, callback);
  }
};
