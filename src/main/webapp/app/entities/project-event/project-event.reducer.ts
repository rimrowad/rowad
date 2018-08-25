import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProjectEvent, defaultValue } from 'app/shared/model/project-event.model';

export const ACTION_TYPES = {
  FETCH_PROJECTEVENT_LIST: 'projectEvent/FETCH_PROJECTEVENT_LIST',
  FETCH_PROJECTEVENT: 'projectEvent/FETCH_PROJECTEVENT',
  CREATE_PROJECTEVENT: 'projectEvent/CREATE_PROJECTEVENT',
  UPDATE_PROJECTEVENT: 'projectEvent/UPDATE_PROJECTEVENT',
  DELETE_PROJECTEVENT: 'projectEvent/DELETE_PROJECTEVENT',
  RESET: 'projectEvent/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProjectEvent>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProjectEventState = Readonly<typeof initialState>;

// Reducer

export default (state: ProjectEventState = initialState, action): ProjectEventState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROJECTEVENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROJECTEVENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROJECTEVENT):
    case REQUEST(ACTION_TYPES.UPDATE_PROJECTEVENT):
    case REQUEST(ACTION_TYPES.DELETE_PROJECTEVENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROJECTEVENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROJECTEVENT):
    case FAILURE(ACTION_TYPES.CREATE_PROJECTEVENT):
    case FAILURE(ACTION_TYPES.UPDATE_PROJECTEVENT):
    case FAILURE(ACTION_TYPES.DELETE_PROJECTEVENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTEVENT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROJECTEVENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROJECTEVENT):
    case SUCCESS(ACTION_TYPES.UPDATE_PROJECTEVENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROJECTEVENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/project-events';

// Actions

export const getEntities: ICrudGetAllAction<IProjectEvent> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROJECTEVENT_LIST,
    payload: axios.get<IProjectEvent>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IProjectEvent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROJECTEVENT,
    payload: axios.get<IProjectEvent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProjectEvent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROJECTEVENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProjectEvent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROJECTEVENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProjectEvent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROJECTEVENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
