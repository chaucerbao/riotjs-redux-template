// Dependencies
import fetch from "isomorphic-fetch";

const baseUrl = "http://jsonplaceholder.typicode.com";
const cacheFor = 300;

export const REQUEST_ITEMS = "REQUEST_ITEMS";
export function requestItems() {
  return {
    type: REQUEST_ITEMS
  }
}

export const RECEIVE_ITEMS = "RECEIVE_ITEMS";
export function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    updatedAt: Date.now(),
    items: items
  }
}

export function fetchItems() {
  return (dispatch, getState) => {
    const branch = getState().branch;

    // Check the cache first
    if (Date.now() - branch.updatedAt < cacheFor * 1000) {
      return Promise.resolve();
    }

    dispatch(requestItems());

    return fetch(`${baseUrl}/posts`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Server unable to process request");
      })
      .then(items => dispatch(receiveItems(items)))
      .catch(e => dispatch(fetchItemsFailed(e)));
  };
}

export const FETCH_ITEMS_FAILED = "FETCH_ITEMS_FAILED";
function fetchItemsFailed(e) {
  return {
    type: FETCH_ITEMS_FAILED,
    message: e.message
  }
}
