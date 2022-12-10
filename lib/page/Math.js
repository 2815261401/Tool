const MyMath = Object.create(Math);
MyMath.nTosum = (n) => (n * MyMath.abs(n) + n) >> 1;
MyMath.sumTon = (sum) => {
    const n = ((Math.abs(sum) * 8 + 1) ** 0.5 + 1) / 2 - 1;
    return n % 1 ? null : sum > 0 ? n : -n;
};
export default MyMath;
//# sourceMappingURL=Math.js.map