shrimp-calendar
==============================================================================

STOP do you really want to use a calendar library? :shrimp:
Maybe you should try writing your own, its not that hard.

OK, if you want to try to use this one, go ahead, it probably won't fit all your
needs, but it might be a good start.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install shrimp-calendar
```


Usage
------------------------------------------------------------------------------

```hbs
<ShrimpCalendar @events={{this.events}} as |events| >
  <span>{{event.start}}-{{event.end}}</span>
  <LinkTo @route="event.show" @model={{event}}>{{event.title}}</LinkTo>
</ShrimpCalendar>
```

TODO
------------------------------------------------------------------------------
* add week and day views
* support changing timezone


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
