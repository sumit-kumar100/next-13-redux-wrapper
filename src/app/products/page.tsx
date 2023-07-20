import { DataTable } from "@/components/ui/data-table";
import { useDispatch, useSelector } from "@/hooks/redux";
import { NextReduxWrapper } from "@/redux/middleware";
import { RootDispatch, RootState } from "@/redux/store";
import { getProducts } from "@/services/product";

import { columns } from "./columns";

/**
* Hydrating Specific Slices of State in Redux

* When fetching data from the server to populate certain parts of our application state, we 
* want to ensure that only the fetched slices of state are updated and not the existing data on 
* the client-side. The problem arises when we hydrate the entire state, as it can unintentionally 
* overwrite the existing data, even if it's not fetched from the server.

* To address this issue, we've enhanced our NextReduxWrapper function to selectively 
* hydrate only the slices of state that come from the server. We achieve this by introducing a 
* new type, HydrateableSlices, which represents the keys (slices) of the RootState that
* can be hydrated.

* The NextReduxWrapper function now enforces that the state prop must be an 
* object containing only keys from HydrateableSlices. It preserves the type of each 
* selected slice of the state.

* By using this approach, developers can safely hydrate specific slices of RootState by
* passing them as the state prop to NextReduxWrapper. The function's internal logic 
* ensures that only the selected slices get updated, leaving other slices unaffected.

* Developers can now use NextReduxWrapper with confidence, knowing that it allows 
* selective hydration of specific slices from the server, avoiding any unintended overwriting of 
* existing data on the client-side. This improvement enhances the safety and reliability of state 
* hydration in Redux applications.

**/

export default async function IndexPage() {
  const dispatch: RootDispatch = useDispatch();

  await dispatch(getProducts());

  const state = useSelector((state: RootState) => state);

  const hydrateStates = {
    product: state.product,
  };

  return (
    <NextReduxWrapper hydrateStates={hydrateStates}>
      <DataTable columns={columns} data={state.product.data.products} />
    </NextReduxWrapper>
  );
}
