export interface Base32Options {
    alphabet: string;
}

export function encodeBase32(str: string, options: Partial<Base32Options> = {}) {
    const opts = { alphabet: 'abcdefghijklmnopqrstuv0123456789', ...options };
    const { alphabet } = opts;
    const bytes = new TextEncoder().encode(str);
    let skip = 0;
    let bits = 0;
    let output = '';

    for (let i = 0; i < bytes.length;) {
        const byte = bytes[i];
        if (skip < 0) {
            bits |= (byte >> (-skip));
        } else {
            bits = (byte << skip) & 248;
        }

        if (skip > 3) {
            skip -= 8;
            i += 1;
            continue;
        }
        if (skip < 4) {
            output += alphabet[bits >> 3];
            skip += 5;
        }
    }
    if (skip < 0) {
        output += alphabet[bits >> 3];
    }
    return output;
}

export function decodeBase32(str: string, options: Partial<Base32Options> = {}) {
    const opts = { alphabet: 'abcdefghijklmnopqrstuv0123456789', ...options };
    const { alphabet } = opts;
    let skip = 0;
    let byte = 0;
    const bytes = [];

    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        let val = alphabet.indexOf(char);
        if (val === -1) {
            throw new Error('Invalid encoding');
        }
        val <<= 3;
        byte |= val >>> skip;
        skip += 5;
        if (skip >= 8) {
            bytes.push(byte);
            skip -= 8;
            if (skip > 0) {
                byte = (val << (5 - skip)) & 255;
            } else {
                byte = 0;
            }
        }
    }
    const arr = new Uint8Array(bytes);
    return new TextDecoder().decode(arr);
}
