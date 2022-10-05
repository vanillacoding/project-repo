import getDateFromMonth from "../../utils/getDateFromMonth";

describe("getDateFromMonth", () => {
  test("should return date array for specific year and month", () => {
    expect(getDateFromMonth("2020", "1").length).toBe(31);
    expect(getDateFromMonth("2020", "2").length).toBe(29);
    expect(getDateFromMonth("2020", "3").length).toBe(31);
    expect(getDateFromMonth("2020", "4").length).toBe(30);
    expect(getDateFromMonth("2021", "1").length).toBe(31);
    expect(getDateFromMonth("2021", "2").length).toBe(28);
    expect(getDateFromMonth("2021", "3").length).toBe(31);
    expect(getDateFromMonth("2021", "4").length).toBe(30);
  });
});
