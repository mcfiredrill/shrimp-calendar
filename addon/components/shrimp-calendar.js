import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekday);

// mostly copied this from https://codesandbox.io/s/ur29q?file=/src/index.js:3009-3034
// and adapted it for ember

//const TODAY = dayjs().format('YYYY-MM-DD');

const INITIAL_YEAR = dayjs().format('YYYY');
const INITIAL_MONTH = dayjs().format('M');
const INITIAL_DAY = dayjs().format('DD');

export default class ShrimpCalendarComponent extends Component {
  @tracked currentYear;
  @tracked currentMonth;
  @tracked currentDay;

  get days() {
    return [
      ...this.previousMonthDays(),
      ...this.currentMonthDays(),
      ...this.nextMonthDays(),
    ];
  }

  currentMonthDays() {
    let year = this.currentYear;
    let month = this.currentMonth;
    return [...Array(this.getNumberOfDaysInMonth(year, month))].map(
      (day, index) => {
        let _day = dayjs(`${year}-${month}-${index + 1}`);
        let eventsOnDay;
        if (this.args.events) {
          eventsOnDay = this.args.events.filter((event) => {
            return dayjs(event.start).isSame(_day, 'day');
          });
        }
        return {
          date: _day.format('YYYY-MM-DD'),
          dayOfMonth: index + 1,
          isCurrentMonth: true,
          isCurrentDay: this.currentDay === _day.format("DD"),
          events: eventsOnDay,
        };
      }
    );
  }

  previousMonthDays() {
    let year = this.currentYear;
    let month = this.currentMonth;
    const firstDayOfTheMonthWeekday = this.getWeekday(
      this.currentMonthDays()[0].date
    );

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = dayjs(
      this.currentMonthDays()[0].date
    )
      .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`
          ).format('YYYY-MM-DD'),
          dayOfMonth: previousMonthLastMondayDayOfMonth + index,
          isCurrentMonth: false,
        };
      }
    );
  }

  nextMonthDays() {
    let year = this.currentYear;
    let month = this.currentMonth;
    const lastDayOfTheMonthWeekday = this.getWeekday(
      `${year}-${month}-${this.currentMonthDays().length}`
    );

    const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format('YYYY-MM-DD'),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
      };
    });
  }

  get weeks() {
    let _weeks = [];
    for (let i = 0; i < this.days.length; i += 7) {
      _weeks.push(this.days.slice(i, i + 7));
    }
    return _weeks;
  }

  get currentMonthName() {
    return dayjs(`${this.currentYear}-${this.currentMonth}-1`).format('MMMM');
  }

  getWeekday(date) {
    return dayjs(date).weekday();
  }

  getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }

  @action
  previousMonth() {
    this.currentMonth = parseInt(this.currentMonth) - 1;
    const date =  dayjs(`${this.currentYear}-${this.currentMonth}-${this.currentDay}`).$d;
    if (typeof this.args.onCalendarNavigate === 'function') {
      this.args.onCalendarNavigate({start: date,});
    }
  }

  @action
  nextMonth() {
    this.currentMonth = parseInt(this.currentMonth) + 1;
    const date =  dayjs(`${this.currentYear}-${this.currentMonth}-${this.currentDay}`).$d;
    if (typeof this.args.onCalendarNavigate === 'function') {
      this.args.onCalendarNavigate({start: date,});
    }
  }

  @action
  handleDayClick(day) {
    console.log(`${day} was clicked in component`);
    if (this.args.onDayclick) {
      this.args.onDayclick(day);
    }
  }

  constructor(owner, args) {
    super(owner, args);
    console.log('hi shrimp');
    const startDate = dayjs(args.startDate);
    console.log(startDate);
    this.currentYear = startDate.format('YYYY') || INITIAL_YEAR;
    this.currentMonth = startDate.format('M') || INITIAL_MONTH;
    this.currentDay = startDate.format('DD') || INITIAL_DAY;
  }
}
