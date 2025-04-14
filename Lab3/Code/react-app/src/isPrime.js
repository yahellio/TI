export function isPrime(num) {
    if (num <= 1) return false;  // 0 и 1 - не простые
    if (num <= 3) return true;   // 2 и 3 - простые
    if (num % 2 === 0 || num % 3 === 0) return false;  // отсекаем чётные и кратные 3

    // Проверяем делители вида 6k ± 1 до √num
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}