// Dependencies
import "modules/module";
import { fetchItems } from "store/branch/actions";

// Styles
import "./style";

<homepage>
  <h1>Homepage</h1>

  <ul>
    <li each={ items }><a href="/resource/{ id }">{ title }</a></li>
  </ul>

  <a href="/page-{ previousPage }">Previous</a>
  <a href="/page-{ nextPage }">Next</a>

  <module />

  const { dispatch, subscribe, getState } = opts.store;
  const self = this;
  const page = Number(opts.page) || 1;
  const perPage = 10;

  let unsubscribe;

  self.items = [];
  self.previousPage = page - 1;
  self.nextPage = page + 1;

  function render() {
    const items = getState().branch.items;

    self.items = items.slice((page - 1) * perPage, page * perPage);
    self.previousPage = Math.max(page - 1, 1);
    self.nextPage = Math.min(page + 1, items.length / perPage);

    self.update();
  }

  self.on("mount", () => {
    unsubscribe = subscribe(render);
    dispatch(fetchItems()).then(render);
  });

  self.on("unmount", () => {
    unsubscribe();
  });
</homepage>
