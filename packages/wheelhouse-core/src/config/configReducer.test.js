
import { CONFIG_LOADED } from "./configActions";
import configReducer from "./configReducer";

describe("configReducer", function() {
  it("should accept config parameters", function() {
    const newState = configReducer(null, {
      type: CONFIG_LOADED,
      configData: { port: 9876 }
    });
    expect(newState.port).toBe(9876);
  });
});
