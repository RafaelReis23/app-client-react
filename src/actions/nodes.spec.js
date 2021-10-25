import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";
import nodeBlocksDataMock from "../constants/mocks/nodeBlocksMock";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { node_name: "Secret Lowlands" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });


  it("should have error to fetch the node data", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.reject({
        status: 500,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });


  it("should fetch the node block data", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ data: nodeBlocksDataMock });
        },
      })
    );
    await ActionCreators.fetchNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_BLOCKS_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_BLOCKS_STATUS_SUCCESS,
        node,
        res: nodeBlocksDataMock,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node block data", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.fetchNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_BLOCKS_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_BLOCKS_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should have error to fetch the node block data", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.reject({
        status: 500,
      })
    );
    await ActionCreators.fetchNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_BLOCKS_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_BLOCKS_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

});
