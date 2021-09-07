import assert from 'assert';

import { decodeBase32, encodeBase32 } from '../main';

describe('Base 32', () => {

    it('encodes basic latin', () => {
        assert.strictEqual(encodeBase32('Hello World!'), 'jbs025dpebl086tmmqqq');
        assert.strictEqual(
            decodeBase32(encodeBase32('Hello World!')), 'Hello World!');
    });

    it('encodes extended sets', () => {
        assert.strictEqual(encodeBase32('Français'), 'i33gc50du7q0s62');
        assert.strictEqual(
            decodeBase32(encodeBase32('Français')), 'Français');
    });

    it('encodes emoji', () => {
        assert.strictEqual(encodeBase32('Hello 👋 👾'), 'jbs025dped2j9emled2j9en8');
        assert.strictEqual(
            decodeBase32(encodeBase32('Hello 👋 👾')), 'Hello 👋 👾');
    });

});
