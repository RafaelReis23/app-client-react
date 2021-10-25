import React from "react";
import { shallow } from "enzyme";
import Block from "./Block";
import nodeBlocksDataMock from "../../../constants/mocks/nodeBlocksMock";

jest.mock("cross-fetch");

describe("<BlockList />", () => {

    it("should validate block data", async () => {

        const wrapper = shallow(
            <Block
                id={nodeBlocksDataMock[0].id}
                description={nodeBlocksDataMock[0].attributes.data}
            />
        );

        expect(wrapper.find({ children: "The Human Torch" })).toBeTruthy();
    });
});
