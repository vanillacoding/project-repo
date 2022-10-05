/**
 * function to swap two schedules
 * @param {array} schedules - including schedules of target indices
 * @param {number} originIndex - of schedule, you'd like to swap
 * @param {number} destinationIndex - of schedule, you'd like to swap
 * @returns swaped schedules
 */
function swapSchedule(schedules, originIndex, destinationIndex) {
  function swapIndex(schedule) {
    if (schedule.index === originIndex) {
      return { index: destinationIndex, site: schedule.site };
    }

    if (schedule.index === destinationIndex) {
      return { index: originIndex, site: schedule.site };
    }

    return schedule;
  }

  return schedules.map(swapIndex).sort((a, b) => a.index - b.index);
}

export default swapSchedule;
