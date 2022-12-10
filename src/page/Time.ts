export default class Time extends Date {
	constructor();
	constructor(value: number | string | Date | Time);
	constructor(
		year: number,
		monthIndex: number,
		date?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		ms?: number
	);
	constructor(
		value?: string | number | Date | Time,
		monthIndex?: number,
		date?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		ms?: number
	) {
		if (value === void 0 && monthIndex === void 0) {
			super();
		} else if (value !== void 0 && monthIndex === void 0) {
			super(value);
		} else if (value !== void 0 && monthIndex !== void 0 && typeof value === 'number') {
			super(value, monthIndex, date || 0, hours || 0, minutes || 0, seconds || 0, ms || 0);
		} else {
			super();
		}
	}
	/**
	 * 获取当前日期是第几周
	 * @returns 返回第几周数字值
	 */
	getWeek(): number {
		return Math.ceil(
			Math.ceil(
				(this.valueOf() -
					new Time(
						this.getFullYear(),
						0,
						9 - (this.format('yyyy-01-01', true).getDay() || 7)
					).valueOf()) /
					86400000
			) / 7
		);
	}
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
	format(format: string, toDate: boolean): Time;
	format(format: string, toDate?: boolean): string | Time {
		// 中文数字 (星期)
		const week: { [key: string]: string } = {
			'0': '日',
			'1': '一',
			'2': '二',
			'3': '三',
			'4': '四',
			'5': '五',
			'6': '六'
		};
		// 中文数字（季度）
		const quarter: { [key: string]: string } = {
			'1': '一',
			'2': '二',
			'3': '三',
			'4': '四'
		};
		[/y+/, /M+/, /d+/, /h+/, /H+/, /m+/, /s+/, /q+/, /w+/, /W+/].forEach((regexp, i) => {
			(format.match(regexp) || []).forEach((matchStr: string) => {
				let replace: string = '';
				if (i === 0) {
					replace = this.getFullYear().toString();
				} else if (i === 1) {
					replace = (this.getMonth() + 1).toString();
				} else if (i === 2) {
					replace = this.getDate().toString();
				} else if (i === 3) {
					replace = this.getHours().toString();
				} else if (i === 4) {
					replace = (this.getHours() % 12 || 12).toString();
				} else if (i === 5) {
					replace = this.getMinutes().toString();
				} else if (i === 6) {
					replace = this.getSeconds().toString();
				} else if (i === 7) {
					replace = quarter[Math.floor((this.getMonth() + 3) / 3).toString()];
				} else if (i === 8) {
					replace = week[this.getDay()];
				} else if (i === 9) {
					replace = this.getWeek().toString();
				}
				if (i < 7) {
					format = format.replace(
						matchStr,
						matchStr.length === 1 ? replace : replace.padStart(matchStr.length, '0')
					);
				} else if (i === 7) {
					format = format.replace(matchStr, matchStr.length >= 4 ? `第${replace}季度` : replace);
				} else if (i === 8) {
					format = format.replace(
						matchStr,
						matchStr.length > 1
							? matchStr.length > 2
								? `星期${replace}`
								: `周${replace}`
							: replace
					);
				} else if (i === 9) {
					format = format.replace(matchStr, matchStr.length >= 3 ? `第${replace}周` : replace);
				}
			});
		});

		if (toDate) {
			return new Time(format);
		}
		return format;
	}
	/**
	 * 获取最后N天
	 * @param dayNum 天数
	 * @param format 格式,详情查看format方法
	 * @returns 最后N天的数组,不包括当天
	 */
	getLatsTime(dayNum: number, format?: string): (string | Time)[] {
		const list: any = [];
		for (let i = 0; i < dayNum; i++) {
			if (format) {
				list.push(new Time(this.getFullYear(), this.getMonth(), this.getDate() - i).format(format));
			} else {
				list.push(new Time(this.getFullYear(), this.getMonth(), this.getDate() - 1 - i));
			}
		}
		return list;
	}
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
	getDifference(date: string | Date | Time, format?: string) {
		const time = new Time(date);
		const difference = time.getTime() - this.getTime();
		if (!format || difference <= 0) {
			return difference <= 0 ? 0 : difference;
		}
		let differenceStr = format;
		const second = /(d|h|m|s)+/.test(differenceStr) ? 1000 : difference + 1;
		const minute = /(d|h|m)+/.test(differenceStr) ? 60 * second : difference + 1;
		const hour = /(d|h)+/.test(differenceStr) ? 60 * minute : difference + 1;
		const data = /(d)+/.test(differenceStr) ? 24 * hour : difference + 1;
		[/d+/, /h+/, /m+/, /s+/].forEach((regexp, i) => {
			(format.match(regexp) || []).forEach((matchStr: string) => {
				let replace: string = '';
				if (i === 0) {
					replace = Math.floor(difference / data).toString();
				} else if (i === 1) {
					replace = Math.floor((difference % data) / hour).toString();
				} else if (i === 2) {
					replace = Math.floor(((difference % data) % hour) / minute).toString();
				} else if (i === 3) {
					replace = Math.floor((((difference % data) % hour) % minute) / second).toString();
				}
				differenceStr = differenceStr.replace(
					matchStr,
					matchStr.length === 1 ? replace : replace.padStart(matchStr.length, '0')
				);
			});
		});
		return differenceStr;
	}
	/**
	 * 获取当前月份的最后一天
	 * @returns 当前月份的最后一天
	 */
	getMonthLastDay(): Time {
		return new Time(this.getFullYear(), this.getMonth() + 1, 0);
	}
}
