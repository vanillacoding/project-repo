import isFoldSideBarReducer, {
  setIsFoldSideBar,
} from "../../redux/reducers/isFoldSideBar";

describe("isFoldSideBar reducer", () => {
  const initialState = { isFoldSideBar: false };

  it("return the initial state when undefined received", () => {
    expect(isFoldSideBarReducer(undefined, { type: undefined })).toEqual({
      isFoldSideBar: false,
    });
  });

  it("should handle setIsFoldSideBar", () => {
    const test = isFoldSideBarReducer(
      initialState,
      setIsFoldSideBar(!initialState.isFoldSideBar),
    );

    expect(test.isFoldSideBar).toEqual(true);
  });
});
