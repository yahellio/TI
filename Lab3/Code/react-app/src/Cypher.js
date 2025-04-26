/* global BigInt */

export function Encrypt(bytes, b, n) {
    const bigB = BigInt(b);
    const bigN = BigInt(n);
    return bytes.map(byte => {
        const bigByte = BigInt(byte);
        const result = (bigByte * (bigByte + bigB)) % bigN;
        return Number(result); 
    });
}

export function Decrypt(bytes, b, n, q, p) {
    const bigB = BigInt(b);
    const bigN = BigInt(n);
    const bigQ = BigInt(q);
    const bigP = BigInt(p);

    return bytes.map(byte => {
        const bigByte = BigInt(byte);

        const D = (bigB * bigB + 4n * bigByte) % bigN;
        const mp = modPow(D, (bigP + 1n) / 4n, bigP);
        const mq = modPow(D, (bigQ + 1n) / 4n, bigQ);

        //расширенный алгоритм Евлкида
        const [gcd, yp, yq] = gcd_ext(bigP, bigQ);

        //китайская теорема об остатках
        let d = [];
        d[0] = (yp * bigP * mq + yq * bigQ * mp) % bigN;
        if (d[0] < 0n) d[0] += bigN;
        d[1] = (bigN - d[0]) % bigN;
        d[2] = (yp * bigP * mq - yq * bigQ * mp) % bigN;
        if (d[2] < 0n) d[2] += bigN;
        d[3] = (bigN - d[2]) % bigN;
 
        for (let i = 0; i < 4; i++) {
            let m = (d[i] - bigB);
            if (m % 2n !== 0n) {
                m = (m + bigN);
            }
            m = (m / 2n) % bigN;
            if (m < 0n) m += bigN;

            if (m >= 0n && m <= 255n) {
                return Number(m); 
            }
        }

        return null; 
    });
}

function modPow(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return result;
}

function gcd_ext(a, b) {
    if (b === 0n) return [a, 1n, 0n];
    const [gcd, x1, y1] = gcd_ext(b, a % b);
    return [gcd, y1, x1 - (a / b) * y1];
}
