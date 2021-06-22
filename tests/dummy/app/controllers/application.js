import Controller from '@ember/controller';
import dayjs from 'dayjs';

export default class ApplicationController extends Controller {
  constructor() {
    super();
    this.events = [
      {
        title: 'Big Shrimpoff',
        start: '2021-06-03T16:00:00.000Z',
        end: '2021-06-03T17:00:00.000Z',
      },
      {
        title: 'Big Shrimpoff part 2',
        start: '2021-06-03T17:00:00.000Z',
        end: '2021-06-03T18:00:00.000Z',
      },
    ];
  }
}
