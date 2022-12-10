import MyMath from './page/Math';
import Time from './page/Time';
declare const Tool: {
    Time: typeof Time;
    MyMath: MyMath;
};
export { Time, MyMath };
export default Tool;
