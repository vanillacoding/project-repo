import calculateRegion from "./calculateRegion";

describe(">>> UTILS --- CALCULATE REGION", () => {
  it("+++ pass region for one location", () => {
    const viewPadding = 1;
    const region = {
      latitude: 5,
      longitude: 5,
      latitudeDelta: 10,
      longitudeDelta: 10,
    };

    expect(calculateRegion([region], viewPadding)).toEqual(region);
  });

  it("+++ pass region list", () => {
    const viewPadding = 1;
    const northeast = {
      latitude: 2,
      longitude: 2,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };
    const southeast = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };
    const expectedRegion = {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };

    expect(calculateRegion([northeast, southeast], viewPadding)).toEqual(expectedRegion);
  });
});
