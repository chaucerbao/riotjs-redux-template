// Dependencies
import { expect } from "chai";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import sinon from "sinon";

// Test item
import * as actions from "../../../src/store/branch/actions.js";

const mockStore = configureStore([thunk]);

describe("Branch's", () => {
  before(() => {
    sinon.stub(Date, "now", () => 1234567890);
  });

  after(() => {
    Date.now.restore();
  });

  // Action creators
  describe("action creator", () => {
    describe("requestItems()", () => {
      it("returns a REQUEST_ITEMS action", () => {
        expect(actions.requestItems()).to.deep.equal({
          type: "REQUEST_ITEMS"
        });
      });
    });

    describe("receiveItems(items)", () => {
      it("returns a RECEIVE_ITEMS action", () => {
        const items = [{ id: 1 }];

        expect(actions.receiveItems(items)).to.deep.equal({
          type: "RECEIVE_ITEMS",
          updatedAt: 1234567890,
          items: [{ id: 1 }]
        });
      });
    });
  });

  // Asynchronous actions
  describe("asynchronous action", () => {
    describe("fetchItems()", () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it("dispatches a RECEIVE_ITEMS action on success", done => {
        const store = mockStore({
          branch: {
            isLoading: false,
            updatedAt: null,
            items: []
          }
        });

        nock("http://jsonplaceholder.typicode.com")
          .get("/posts")
          .reply(200, [{ id: 1 }]);

        store.dispatch(actions.fetchItems())
          .then(() => {
            expect(store.getActions()).to.deep.equal([{
              type: "REQUEST_ITEMS"
            }, {
              type: "RECEIVE_ITEMS",
              updatedAt: 1234567890,
              items: [{ id: 1 }]
            }]);
          })
          .then(done)
          .catch(done);
      });

      it("dispatches a FETCH_ITEMS_FAILED action on failure", done => {
        const store = mockStore({
          branch: {
            isLoading: false,
            updatedAt: null,
            items: []
          }
        });

        nock("http://jsonplaceholder.typicode.com")
          .get("/posts")
          .reply(500);

        store.dispatch(actions.fetchItems())
          .then(() => {
            expect(store.getActions()).to.deep.equal([{
              type: "REQUEST_ITEMS"
            }, {
              type: "FETCH_ITEMS_FAILED",
              message: "Server unable to process request"
            }]);
          })
          .then(done)
          .catch(done);
      });

      describe("cache", () => {
        it("does not dispatch any actions on hit", done => {
          const store = mockStore({
            branch: {
              isLoading: false,
              updatedAt: 1234567890 - (299 * 1000),
              items: [{ id: 1 }]
            }
          });

          let http = nock("http://jsonplaceholder.typicode.com")
            .get("/posts")
            .reply(200, [{ id: 2 }]);

          store.dispatch(actions.fetchItems())
            .then(() => {
              expect(http.isDone()).to.be.false;
              expect(store.getActions()).to.deep.equal([]);
            })
            .then(done)
            .catch(done);
        });

        it("dispatches a RECEIVE_ITEMS action on hit", done => {
          const store = mockStore({
            branch: {
              isLoading: false,
              updatedAt: 1234567890 - (300 * 1000),
              items: [{ id: 1 }]
            }
          });

          let http = nock("http://jsonplaceholder.typicode.com")
            .get("/posts")
            .reply(200, [{ id: 2 }]);

          store.dispatch(actions.fetchItems())
            .then(() => {
              expect(http.isDone()).to.be.true;
              expect(store.getActions()).to.deep.equal([{
                type: "REQUEST_ITEMS"
              }, {
                type: "RECEIVE_ITEMS",
                updatedAt: 1234567890,
                items: [{ id: 2 }]
              }]);
            })
            .then(done)
            .catch(done);
        });
      });
    });
  });
});
