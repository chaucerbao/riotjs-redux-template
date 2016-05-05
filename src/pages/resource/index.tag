// Dependencies
import "modules/module";
import { fetchItems } from "store/branch/actions";

// Styles
import "./style";

<resource>
  <h1>Resource</h1>

  <h2>{ item.title }</h2>

  <module />

  const { dispatch, subscribe, getState } = opts.store;
  const self = this;

  let unsubscribe;

  self.item = {};

  function render() {
    self.item = getState().branch.items.find((item) => item.id == opts.id);

    self.update();
  }

  self.on("mount", () => {
    unsubscribe = subscribe(render);
    dispatch(fetchItems()).then(render);
  });

  self.on("unmount", () => {
    unsubscribe();
  });
</resource>
