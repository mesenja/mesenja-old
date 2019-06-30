import { createStore, createTypedHooks } from 'easy-peasy'

import model, { StoreModel } from './models'

const { useDispatch, useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>()

export default (initialState?: any) =>
  createStore(model, {
    initialState
  })

export { useDispatch, useStoreActions, useStoreState }
