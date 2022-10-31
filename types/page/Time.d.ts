export default class Time extends Date {
    constructor();
    constructor(value: number | string | Date | Time);
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
    getWeek(): number;
    format(format: string): string;
    format(format: string, toDate: boolean): Time;
    getLatsTime(dayNum: number, format?: string): (string | Time)[];
    getDifference(date: string | Date | Time, format?: string): string | number;
    getMonthLastDay(): Time;
}
