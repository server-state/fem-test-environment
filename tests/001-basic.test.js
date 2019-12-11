import React from 'react';
import { create } from "react-test-renderer";
import App from "../src/App";

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

describe('Basic tests for the test environment', () => {
    it("should render without any complications", () => {
        console.error = jest.fn();
        const app = create(
            <App
                onRegisterAction={() => {}}
                onRefresh={() => {}}
            />
        );

        expect(app).toMatchSnapshot();
    });
});