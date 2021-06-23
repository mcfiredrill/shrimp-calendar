import Controller from '@ember/controller';

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
      {
        title: 'Big Shrimpoff part 3',
        start: '2021-06-03T18:00:00.000Z',
        end: '2021-06-03T19:00:00.000Z',
      },
      {
        title: 'hotdog parade',
        start: '2021-06-03T19:00:00.000Z',
        end: '2021-06-03T21:00:00.000Z',
      },
      {
        title: 'telethon fundraiser',
        start: '2021-06-24T19:00:00.000Z',
        end: '2021-06-24T21:00:00.000Z',
      },
    ];
  }
}
