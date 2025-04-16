
export function Encrypt(bytes, b, n){
    return bytes.map(byte => {
        return (byte*(byte + b)) % n;
    })   
}   

export function Decrypt(bytes, b, n, q, p){
    // mi^2 + bmi - ci = 0 (mod n)
    // m = (-b + корень(D)) / 2 
    // D = b^2 + 4c (mod n)

    return bytes.map(byte => {

        let d = (b^2 + 4*byte) % n;
        
        let s = Math.pow(d, ((p+1)/4)) % p;
        let r = Math.pow(d, ((q+1)/4)) % q;
        
        //алгоритм Евклида расширенный Yp * p + Yq * q = 1 
        // a = p     
        // b = q     
        // Yp = X1 = 
        // Yq = Y1 =  
        let res = gcd_ext(p, q);
        let Yp = res[1];
        let Yq = res[2];

        let d1 = (Yp * p * r + Yq * q *s) % n;
        let d2 = -(Yp * p * r + Yq * q *s) % n;
        let d3 = (Yp * p * r - Yq * q *s) % n;
        let d4 = -(Yp * p * r - Yq * q *s) % n;

        let m1 = ((-b + d1) / 2) % n;
        let m2 = ((-b + d2) / 2) % n; 
        let m3 = ((-b + d3) / 2) % n;   
        let m4 = ((-b + d4) / 2) % n;

        if (m1 <= 256) return m1; 
        if (m2 <= 256) return m2; 
        if (m3 <= 256) return m3; 
        if (m4 <= 256) return m4; 
    })

}

function gcd_ext(a, b){
    if(b === 0){
        return [a, 1, 0];
    }

    let res = gcd_ext(b, a%b);
    res[1] -= (a/b) * res[2];
    let temp = res[1];
    res[1] = res[2];
    res[2] = temp;

    return res;
}

