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
declare const MyMath: MyMath;
export default MyMath;
