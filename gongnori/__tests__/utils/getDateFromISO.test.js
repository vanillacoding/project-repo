import getDateFromIso from "../../utils/getDateFromIso";

describe("getDateFromIso", () => {
  test("should return date array for ISO 8601 date", () => {
    expect(getDateFromIso("2021-05-28T16:42:58.376Z"))
      .toEqual([2021, 5, 29, 1, 42]);
  });
});
