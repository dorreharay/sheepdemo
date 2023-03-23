import type { Dispatch } from 'redux'
import { v4 as uuidv4 } from 'uuid';
import type { FormikValues } from 'formik';

const SET_CATALOGUE_STATE = 'SET_CATALOGUE_STATE';
const SET_CATALOGUE_LOADING = 'SET_CATALOGUE_LOADING';
const DELETE_CATALOGUE_ITEM = 'DELETE_CATALOGUE_ITEM';
const CREATE_CATALOGUE_ITEM = 'CREATE_CATALOGUE_ITEM';

type ProductType = {
  title?: string,
  description?: string,
  price?: string,
  category?: string,
  brand?: string,
  images?: string[],
  rating?: number,
  stock?: number,
  id: number | string,
}

type CatalogueItemType = {
  products: ProductType[]
}

type CatalogueType = CatalogueItemType | null

export type MainStateType = {
  catalogue: CatalogueType,
  loading: boolean,
}

type Action = {
  type: string,
  payload?: any
}
type HandlerType = {
  [key: string]: any
}

const initialState: MainStateType = {
  catalogue: null,
  loading: false,
};

export function getCatalogue(): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setCatalogueLoading(true))
      const response = await fetch('https://dummyjson.com/products')

      const data = await response.json()

      dispatch(setCatalogueState(data))
    } catch (e) {
      console.log('error - getCatalogue', e)
    } finally {
      dispatch(setCatalogueLoading(false))
    }
  }
}


export function setCatalogueState(payload: CatalogueType) {
  return {
    type: SET_CATALOGUE_STATE,
    payload,
  };
}

export function setCatalogueLoading(payload: boolean) {
  return {
    type: SET_CATALOGUE_LOADING,
    payload,
  };
}

export function createCatalogueItem(payload: FormikValues) {
  return {
    type: CREATE_CATALOGUE_ITEM,
    payload,
  };
}

export function deleteCatalogueItem(payload: number | string) {
  return {
    type: DELETE_CATALOGUE_ITEM,
    payload,
  };
}

const ACTION_HANDLERS: HandlerType = {
  [SET_CATALOGUE_STATE]: (state: MainStateType, action: Action) => {
    return { ...state, catalogue: action.payload };
  },
  [DELETE_CATALOGUE_ITEM]: (state: MainStateType, action: Action) => {
    return {
      ...state,
      catalogue: {
        ...state.catalogue,
        products: state.catalogue?.products.filter((item: ProductType) => item?.id !== action.payload)
      }
    };
  },
  [CREATE_CATALOGUE_ITEM]: (state: MainStateType, action: Action) => {
    return {
      ...state,
      catalogue: {
        ...state.catalogue,
        products: [{ id: uuidv4(), ...action.payload }, ...state.catalogue?.products || []]
      }
    };
  },
  [SET_CATALOGUE_LOADING]: (state: MainStateType, action: Action) => {
    return { ...state, loading: action.payload };
  },
};

function HeaderReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

export default HeaderReducer;
