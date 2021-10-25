import React from "react";
import { shallow } from "enzyme";
import BlockList from "./BlockList";
import nodeBlocksDataMock from "../../constants/mocks/nodeBlocksMock";

jest.mock("cross-fetch");

describe("<BlockList />", () => {

    it("should validate empty status", async () => {

        const wrapper = shallow(
            <BlockList
                blocks={[]}
            />
        );

        expect(wrapper.text().includes("No blocks.")).toBeTruthy();
    });

    it("should validate error status", async () => {

        const wrapper = shallow(
            <BlockList
                errorToCallBlocks
            />
        );

        expect(wrapper.text().includes("Wasn't possible to get blocks...")).toBeTruthy();
    });

    it("should validate loading status", async () => {

        const wrapper = shallow(
            <BlockList
                loadingBlock
            />
        );

        expect(wrapper.text().includes("Getting blocks...")).toBeTruthy();
    });

    it("should validate blocks with data", async () => {

        const wrapper = shallow(
            <BlockList
                blocks={nodeBlocksDataMock}
            />
        );

        expect(wrapper.find({ children: "The Human Torch" })).toBeTruthy();
    });
});
