# Base32 Encoder/Decoder

Yet another Base32 encoder/decoder with following goals:

- Actually works
- Written in TypeScript
- Simple API (just 2 functions, both work with string arguments)
- Node.js + Browser compatibility
- Custom alphabet support
- Extended character sets support (e.g. correctly encodes emojis back and forth)

## Usage

```ts
import { encodeBase32, decodeBase32 } from 'simple-base32';

encodeBase32('Hello 👋 👾');                  // jbs025dped2j9emled2j9en8
decodeBase32('jbs025dped2j9emled2j9en8');    // Hello 👋 👾
```
