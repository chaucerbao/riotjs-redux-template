// Dependencies
import { expect } from "chai";

// Test item
import { REQUEST_ITEMS, RECEIVE_ITEMS, FETCH_ITEMS_FAILED } from "../../../src/store/branch/actions.js";
import reducer from "../../../src/store/branch/reducer.js";

describe("Branch's reducer", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).to.deep.equal({
      isLoading: false,
      updatedAt: null,
      items: []
    });
  });

  it("handles the REQUEST_ITEMS action", () => {
    expect(reducer({
      isLoading: false
    }, {
      type: REQUEST_ITEMS
    })).to.deep.equal({
      isLoading: true
    });
  });

  it("handles the RECEIVE_ITEMS action", () => {
    expect(reducer({
      isLoading: true,
      updatedAt: null,
      items: []
    }, {
      type: RECEIVE_ITEMS,
      updatedAt: 12345,
      items: [{ id: 1 }]
    })).to.deep.equal({
      isLoading: false,
      updatedAt: 12345,
      items: [{ id: 1 }]
    });
  });

  it("handles the FETCH_ITEMS_FAILED action", () => {
    expect(reducer({
      isLoading: true
    }, {
      type: FETCH_ITEMS_FAILED,
      message: "Failure message",
    })).to.deep.equal({
      isLoading: false
    });
  });
});
