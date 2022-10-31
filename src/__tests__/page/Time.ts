import { Time } from '../../index';

test('Test Time', () => {
	expect(new Time('2022-10-01').toString()).toBe(new Date('2022-10-01').toString());
});
