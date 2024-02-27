# js-time-service 
> AKA `@martin-hughes/time-service`

Classes that allow the developer to manipulate time with wrapped versions of `setTimeout` and (later) `setInterval`.

I'll be up front in saying this is an immature package, and that I'm still relatively new to both TS and publishing
packages - so if you see anything that's not idiomatic or good practice, please say so.

## Contents

* [Description](#description)
* [Motivation](#motivation)
* [Examples](#examples)
* [Contributing](#contributing)
* [Security](#security)
* [Future work](#future-work)

## Description

Most JS environments provide `setTimeout` and `setInterval` as global functions. They are exceptionally useful, but what
if you want to change their behaviour? There are two options:

* Do something like `window.setTimeout = myNewTimeout`, or
* Use a wrapper class that provides the behaviour you want.

This package provides the latter.

## Motivation

Given that you can just override the global time functions, why bother with a wrapper class? Largely for isolation:

* You can provide different behaviours to different parts of your application - which can be useful for integration 
  testing, for a demo mode, and more. 
* Once your time service falls out of scope, it and any strange behaviour are gone! No need to remember to reset the
  built in functions through all possible error and return paths

On the other hand, why might you *not* want to use wrappers?

* If a library you use is tightly coupled to your app *and* relies heavily on `setTimeout` or `setInterval` working,
  then this might not work for you
* If you really can't stand 'luxon' - it's a dependency of this package.

### Why is 'luxon' a dependency?

Largely because the native `Date` is a hot mess. This package came out of another (private) project of mine that used
luxon extensively, so it uses a luxon-first philosophy.

As for "why luxon instead of &lt;insert favorite time package&gt;?" - that's kind of arbitrary, but it's because it 
seems to be the best time/date manipulation package available for what **I, personally,** need to do.

## Examples

> This is still a young package. The API is not stable.

The most trivial example possible - wrap the normal timer functions in a class.

```javascript
import {BrowserTimeService} from '@martin-hughes/time-service'

const ts = new BrowserTimeService()
ts.setTimout(() => {console.log('Timeout after 10 seconds!'), 10000})
```

What about speeding up time a bit? Personally I like this for a demo-mode of something that normally runs in real-time.

> This isn't actually implemented yet... Coming soon!

```javascript
import {SpeedyTimeService} from '@martin-hughes/time-service'
import {DateTime} from 'luxon'

const startTime = DateTime.fromObject({year: 2024, month: 2, day: 20, hour: 12, minute: 0, second: 0})
const endTime = startTime.plus({day: 1})

// Make the 24 hour period given by startTime and endTime appear as though it lasts 24 seconds
const ts = new SpeedyTimeService(startTime, endTime, 24)
ts.setInterval(() => {console.log('Appears every second!')}, 3600000)
```

## Contributing

I genuinely welcome all constructive input, regardless of whether I agree with it or not. Please feel free to raise
anything at all in the Github issues for this project - even if it's a question, since that means the documentation
could be better.

If you think I'm not behaving in a way that is appropriate, please say so. I try not to be deliberately rude or 
offensive, so it's most likely a genuine mistake!

## Security

Fingers crossed you won't find a security bug, although it's always possible. Since neither npm nor Github provide a
private messaging service you will need to raise security issues in the public bug tracker. If this project becomes
widely used then I will see if I can change this.

Please bear the public nature of any security issues in mind if you're intending to use this library in a particularly
sensitive context. Alternatively, please contact me via the issue tracker to suggest a means of establishing private
reporting of security issues.

### Why not just email?

I prefer to keep my email off of the internet as far as possible. There are widespread reports of people receiving spam
after publishing packages on npm due to their requirement to add an email address to the public metadata for all 
packages.

If you look in the package metadata for `@martin-hughes/time-service` you will see a valid email - but one which is
pretty much a throwaway for the purposes of maintaining an npm account. Don't report issues there - I won't see the
reports.

## Future work

Clearly this is a very immature package right now. Some things I'd like to do...

* Perhaps TimeService implementations should decorate each other... For example, perhaps a StaticTimeService could
  meaningfully wrap a SpeedyTimeService so that timeouts and intervals still work but a request for the current time is
  still static. I'm not sure that makes total sense, but it might be cool ¯\\\_(ツ)\_/¯
* Split out the underlying time manipulation - currently luxon - into a strategy, in case there's a strong feeling that
  luxon is not acceptable, or luxon becomes deprecated (as moment.js did...)

If these tickle your fancy then please do feel free to contribute!
