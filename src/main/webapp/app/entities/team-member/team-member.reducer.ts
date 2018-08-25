import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITeamMember, defaultValue } from 'app/shared/model/team-member.model';

export const ACTION_TYPES = {
  FETCH_TEAMMEMBER_LIST: 'teamMember/FETCH_TEAMMEMBER_LIST',
  FETCH_TEAMMEMBER: 'teamMember/FETCH_TEAMMEMBER',
  CREATE_TEAMMEMBER: 'teamMember/CREATE_TEAMMEMBER',
  UPDATE_TEAMMEMBER: 'teamMember/UPDATE_TEAMMEMBER',
  DELETE_TEAMMEMBER: 'teamMember/DELETE_TEAMMEMBER',
  RESET: 'teamMember/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITeamMember>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TeamMemberState = Readonly<typeof initialState>;

// Reducer

export default (state: TeamMemberState = initialState, action): TeamMemberState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEAMMEMBER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEAMMEMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TEAMMEMBER):
    case REQUEST(ACTION_TYPES.UPDATE_TEAMMEMBER):
    case REQUEST(ACTION_TYPES.DELETE_TEAMMEMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TEAMMEMBER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEAMMEMBER):
    case FAILURE(ACTION_TYPES.CREATE_TEAMMEMBER):
    case FAILURE(ACTION_TYPES.UPDATE_TEAMMEMBER):
    case FAILURE(ACTION_TYPES.DELETE_TEAMMEMBER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEAMMEMBER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEAMMEMBER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEAMMEMBER):
    case SUCCESS(ACTION_TYPES.UPDATE_TEAMMEMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEAMMEMBER):
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

const apiUrl = 'api/team-members';

// Actions

export const getEntities: ICrudGetAllAction<ITeamMember> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TEAMMEMBER_LIST,
    payload: axios.get<ITeamMember>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITeamMember> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEAMMEMBER,
    payload: axios.get<ITeamMember>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITeamMember> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEAMMEMBER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITeamMember> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEAMMEMBER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITeamMember> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEAMMEMBER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
