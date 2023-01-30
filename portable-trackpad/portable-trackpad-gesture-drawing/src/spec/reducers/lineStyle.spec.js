import lineStyleReducer, {
  setLineColor,
  setLineWidth,
} from "../../redux/reducers/lineStyle";

describe("lineStyle reducer", () => {
  const initialState = {
    lineColor: "black",
    lineWidth: 5,
  };

  it("Return the initial state when undefined received", () => {
    expect(lineStyleReducer(undefined, { type: undefined })).toEqual({
      lineColor: "black",
      lineWidth: 5,
    });
  });

  const color = "red";
  const width = 10;

  it("should handle setLineColor", () => {
    const test = lineStyleReducer(initialState, setLineColor(color));

    expect(test.lineColor).toEqual("red");
  });

  it("should handle setLineWidth", () => {
    const test = lineStyleReducer(initialState, setLineWidth(width));

    expect(test.lineWidth).toEqual(10);
  });
});
