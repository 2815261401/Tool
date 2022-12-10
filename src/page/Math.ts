interface MyMath extends Math {
	/**
	 * 计算1~n的和
	 * @param n
	 */
	nTosum(n: number): number;
	/**
	 * 根据1~n的和求n
	 * @param sum
	 */
	sumTon(sum: number): number | null;
}
const MyMath: MyMath = Object.create(Math);
MyMath.nTosum = (n: number) => (n * MyMath.abs(n) + n) >> 1;
MyMath.sumTon = (sum: number) => {
	const n = ((Math.abs(sum) * 8 + 1) ** 0.5 + 1) / 2 - 1;
	return n % 1 ? null : sum > 0 ? n : -n;
};
export default MyMath;
