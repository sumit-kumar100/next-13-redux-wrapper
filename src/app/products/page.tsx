import { DataTable } from "@/components/ui/table";
import { useDispatch, useSelector } from "@/hooks/redux";
import { NextReduxWrapper } from "@/redux/nextReduxWrapper";
import { RootDispatch, RootState } from "@/redux/store";
import { getProducts } from "@/services/product";

import { columns } from "./columns";

/**
* 
* Hydrating Specific Slices of State in Redux with Support for Full or Partial Data

* When fetching data from the server to populate certain parts of our application state, we
* want to ensure that only the fetched slices of state are updated, either fully or partially, and
* not the existing data on the client-side. The problem arises when we hydrate the entire state,
* as it can unintentionally overwrite the existing data, even if it's not fetched from the server.

* To address this issue, we've enhanced our NextReduxWrapper function to selectively
* hydrate specific slices of state, either fully or partially, that come from the server.
* We achieve this by introducing a new type, HydrateableSlices, which represents the keys (slices)
* of the RootState that can be hydrated.

* The NextReduxWrapper function now enforces that the hydrateStates prop must be an
* object containing only keys from HydrateableSlices, with each key-value pair representing
* a specific slice of state and its corresponding full or partial data.

* By using this approach, developers can safely hydrate specific slices of RootState with either
* full or partial data by passing them as the hydrateStates prop to NextReduxWrapper. The
* function's internal logic ensures that only the selected slices get updated with the provided
* full or partial data, while leaving other slices unaffected.

* Developers can now use NextReduxWrapper with confidence, knowing that it allows
* selective hydration of specific slices from the server, either fully or partially, avoiding any
* unintended overwriting of existing data on the client-side. This improvement enhances the
* safety and reliability of state hydration in Redux applications.
*
**/

export default async function IndexPage() {
  const dispatch: RootDispatch = useDispatch();

  await dispatch(getProducts());

  const state = useSelector((state: RootState) => state);

  // all slices hydrating i.e,[product & todo]
  const allSlices = state

  // fully hydrating product slice
  const fullHydrateSlices = {
    product: state.product
  };

  // fully hydrating product & todo slice which is equal to allSlice as we have only two slices [product & todo]
  const fullHydrateTodoAndProduct = {
    product: state.product,
    todo: state.todo
  };

  // partially hydrating product slice
  const partialHydrateSlices = {
    product: {
      data: {
        ...state.product.data
      },
      isLoading: false
    }
  }

  return (
    <NextReduxWrapper hydrateStates={fullHydrateSlices}>
      <DataTable columns={columns} data={state.product.data.products} />
    </NextReduxWrapper>
  );
}
