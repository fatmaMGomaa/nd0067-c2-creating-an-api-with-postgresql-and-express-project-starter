"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('testing user model', () => {
    it('checking existing of index method', () => {
        expect(store.index).toBeDefined();
    });
    it('checking existing of create method', () => {
        expect(store.create).toBeDefined();
    });
    it('checking existing of show method', () => {
        expect(store.show).toBeDefined();
    });
});
