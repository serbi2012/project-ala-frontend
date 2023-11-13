export const formatToFix = (value: number, fix: number = 2) => {
    // 숫자로 변환한 값을 소수점 두 자리까지 구합니다.
    const number = Number(value);
    if (isNaN(number)) return number;

    // 소수점 아래 값이 있으면 소수점 두 번째 자리까지, 없으면 정수 부분만 사용합니다.
    const rounded = Math.round(number * 100) / 100;
    return rounded % 1 === 0 ? Number(rounded) : Number(rounded.toFixed(fix));
};
