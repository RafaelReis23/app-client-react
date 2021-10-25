import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  CHECK_NODE_BLOCKS_STATUS_START,
  CHECK_NODE_BLOCKS_STATUS_SUCCESS,
  CHECK_NODE_BLOCKS_STATUS_FAILURE
} from '../constants/actionTypes';
import initialState from './initialState';

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = [...state.list];
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list[nodeIndex] = {
          ...state.list[nodeIndex],
          loading: true
        };
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = [...state.list];
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list[nodeIndex] = {
          ...state.list[nodeIndex],
          online: true,
          name: action.res.node_name,
          loading: false
        };
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = [...state.list];
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);

      if (nodeIndex >= 0) {
        list[nodeIndex] = {
          ...state.list[nodeIndex],
          online: false,
          loading: false
        };
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_BLOCKS_STATUS_START:
      list = [...state.list];
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);

      if (nodeIndex >= 0) {
        list[nodeIndex] = {
          ...state.list[nodeIndex],
          loadingBlock: true,
          getBlockError: false,
        };
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_BLOCKS_STATUS_SUCCESS:
      list = [...state.list];
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);

      if (nodeIndex >= 0) {
        list[nodeIndex] = {
          ...state.list[nodeIndex],
          loadingBlock: false,
          getBlockError: false,
          blocks: action.res,
        };
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_BLOCKS_STATUS_FAILURE:
      list = [...state.list];
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);

      if (nodeIndex >= 0) {
        list[nodeIndex] = {
          ...state.list[nodeIndex],
          blocks: [],
          loadingBlock: false,
          getBlockError: true
        };
      }
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
