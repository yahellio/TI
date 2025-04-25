
export function Encrypt(bytes, b, n){
    return bytes.map(byte => {
        return (byte*(byte + b)) % n;
    })   
}   

function modInv(a, mod) {
    const [gcd, x] = gcd_ext(a, mod);
    if (gcd !== 1) throw new Error("No inverse exists");
    return (x % mod + mod) % mod;
}

export function Decrypt(bytes, b, n, q, p) {
    const inv2 = modInv(2, n);
    return bytes.map(byte => {
        const d = (b * b + 4 * byte) % n;
        const s = modPow(d, (p + 1) / 4, p);
        const r = modPow(d, (q + 1) / 4, q);
        const [Yp, Yq] = gcd_ext(p, q);
        
        const d1 = (Yp * p * r + Yq * q * s) % n;
        const d2 = (n - d1) % n;
        const d3 = (Yp * p * r - Yq * q * s) % n;
        const d4 = (n - d3) % n;

        const m1 = ((-b + d1 + n) * inv2) % n;
        const m2 = ((-b + d2 + n) * inv2) % n;
        const m3 = ((-b + d3 + n) * inv2) % n;
        const m4 = ((-b + d4 + n) * inv2) % n;

        const validMs = [m1, m2, m3, m4].filter(m => 
            Number.isInteger(m) && m >= 0 && m <= 255
        );
        if (validMs.length === 0) return null; // или бросить ошибку
        return validMs[0];
    });
}

function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return result;
}

function gcd_ext(a, b) {
    if (b === 0) return [a, 1, 0];
    const [gcd, x1, y1] = gcd_ext(b, a % b);
    return [gcd, y1, x1 - Math.floor(a / b) * y1];
}
