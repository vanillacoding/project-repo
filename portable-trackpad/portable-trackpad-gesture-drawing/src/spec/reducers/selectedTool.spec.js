import selectedToolReducer, {
  setSelectedTool,
} from "../../redux/reducers/selectedTool";

describe("selectedTool reducer", () => {
  const initialState = { selectedTool: "drawing" };

  it("Return the initial state when undefined received", () => {
    expect(selectedToolReducer(undefined, { type: undefined })).toEqual({
      selectedTool: "drawing",
    });
  });

  const tools = { name: "figure" };

  it("should handle setSelectedTool", () => {
    const test = selectedToolReducer(initialState, setSelectedTool(tools.name));

    expect(test.selectedTool).toEqual("figure");
  });
});
