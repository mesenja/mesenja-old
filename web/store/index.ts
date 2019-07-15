import { createStore, createTypedHooks } from 'easy-peasy'

import model, { StoreModel } from './models'

const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<
  StoreModel
>()

export default (initialState?: any) =>
  createStore(model, {
    initialState
  })

export { useStoreActions, useStoreDispatch, useStoreState }
