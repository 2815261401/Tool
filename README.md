# lch-tool

## Project setup
```
npm install
```

## Content
### Time
```typescript
// Time 继承了 Data 的方法
class Time extends Date {
  constructor();
  constructor(value: number | string | Date | Time);
  constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
	/**
	 * 获取当前日期是第几周
	 * @returns 返回第几周数字值
	 */
  getWeek(): number;
	/**
	 * 格式化时间格式
	 * @param format 需要转换的时间格式字符串
	 * @description y 年
	 * @description M 月
	 * @description d 天
	 * @description h 24进制小时
	 * @description H 12进制小时
	 * @description m 分钟
	 * @description s 秒
	 * @description q 季度
	 * @description w 星期
	 * @description W 第几周
	 * @returns 返回拼接后的时间字符串
	 */
  format(format: string): string;
	/**
   * 如果带toDate将返回Time类型的时间
   */
  format(format: string, toDate: boolean): Time;
	/**
	 * 获取最后N天
	 * @param dayNum 天数
	 * @param format 格式,详情查看format方法
	 * @returns 最后N天的数组,不包括当天
	 */
  getLatsTime(dayNum: number, format?: string): (string | Time)[];
	/**
	 * 获取时间差,不支持小于当前时间
	 * @param date 对比的时间,字符串要符合时间格式
	 * @param format 需要转换的时间格式字符串
	 * @description d 天
	 * @description h 小时
	 * @description m 分钟
	 * @description s 秒
	 * @returns 存在format,返回拼接后的时间字符串,否则返回毫秒数
	 */
  getDifference(date: string | Date | Time, format?: string): string | number;
	/**
	 * 获取当前月份的最后一天
	 * @returns 当前月份的最后一天
	 */
  getMonthLastDay(): Time;
}
```