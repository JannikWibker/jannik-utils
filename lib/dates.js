const dates = {
/*
name: setTime
description: creates a new js date object from the given js `date` object and sets the time to the specified values (which are all 0 by default)
usage: setTime(new Date(), 1, 2, 3) // -> some_date
*/
  setTime: (date, hours=0, minutes=0, seconds=0, milliseconds=0) =>
    new Date(new Date(date).setHours(hours, minutes, seconds, milliseconds)),
/*
name: setTimeIgnoreTimezone
description: just like the setTime function, but ignores the current timezone offset by subtracting it from the minutes (js dates handle negative values kind of well)
usage: setTimeIgnoreTimezone(new Date(), 1, 2, 3) // -> some_date
*/
  setTimeIgnoreTimezone: (date, hours=0, minutes=0, seconds=0, milliseconds=0) =>
    new Date(new Date(date).setHours(hours, minutes - date.getTimezoneOffset(), seconds, milliseconds)),
/*
name: compareWithoutTime
description: compares two js date objects ignoring the time (by setting the time of both objects to 0 and comparing their value then)
usage: compareWithoutTime(new Date(), new Date()) // -> true
*/
  compareWithoutTime: (date1, date2) =>
    (date1.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0)),
  stringifyDateInfo: (date=new Date(Date.now()), offset1=0, offset2=0) =>
    dates._stringifyDateInfo(date, offset1, offset2),
  stringifyDateInfoPadded: (date=new Date(Date.now()), offset1=0, offset2=0) =>
    dates._stringifyDateInfoPadded(date, offset1, offset2),
  _stringifyDateInfo: (date, offset1=0, offset2=0) => {
    if(!date) return null
    let l_date = new Date(date.getFullYear(), date.getMonth() + offset1, date.getDate() + offset2)
    return `${l_date.getFullYear()}-${l_date.getMonth() + 1}-${l_date.getDate()}`
  },
  _stringifyDateInfoPadded: (date, offset1=0, offset2=0) => {
    if(!date) return null
    const paddingLeft  = (str, padding, length) => str.length < length ? padding.repeat(length - str.length) + str : str
  /*
    const paddingRight = (str, padding, length) => str.length < length ? str + padding.repeat(length - str.length) : str

    this is basically String.padStart(length, paddingStr) / String.padEnd(length, paddingStr)
    did not really know they existed or rather forgot that they exist

    paddingRight is commented out because it is not used at the moment and eslint

    paddingRight and paddingLeft will most likely move to their own file, as soon as there are more useful String manipulation functions
  */
    let l_date = new Date(date.getFullYear(), date.getMonth() + offset1, date.getDate() + offset2)
    return `${l_date.getFullYear()}-${paddingLeft(String(l_date.getMonth() + 1), '0', 2)}-${paddingLeft(String(l_date.getDate()), '0', 2)}`
  },
  parseDateInfo: (str) =>
    // str should be in ISO 8601 format (e.g. 2017-05-26) (short form without time)
    str === '' || str === undefined
      ? new Date(Date.now())
      : dates._parseDateInfo(str),
  _parseDateInfo: (str) => {
    if(!str) return null
    str = str.split('-')
    return new Date(Date.UTC(str[0], str[1]-1, str[2]))
  },
  _dayOfWeek: (date) => date.getDay() === 0 ? 6 : date.getDay() - 1,
  dayOfWeek: (date) => dates._dayOfWeek(date ? new Date(date): new Date()),
  calculateWeeks: (date) => {
    let lastDateOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
    let numberOfWeeks = Math.ceil((((new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7) + lastDateOfMonth) / 7)
    let weeks = []
    for(let j = 0; j < numberOfWeeks; j++) {
      weeks[j] = []
      for(let k = 0; k < 7; k++) {
        weeks[j][k] = 0
      }
    }
    let i = 0
    for(let k = 1; k < lastDateOfMonth + 1; k++) {
      let l_day = new Date(date.getFullYear(), date.getMonth(), k)
      let l_day_of_week = l_day.getDay() - 1 === -1 ? 6 : l_day.getDay() - 1

      weeks[i][l_day_of_week] = l_day
      if(l_day_of_week === 6)
        i++
    }
    return {
      lastDateOfMonth: lastDateOfMonth,
      numberOfWeeks: numberOfWeeks,
      weeks: weeks,
    }
  },
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  week_days_short: ["Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"],
/*
name: humanize
description: the input `time` is a given date, the output is the difference between now and the given date in a human readable form (like '3 hours ago' or '1 year from now'). This is similar to the `fromNow()` function from moment.js. `n` is an optional parameter (which is 0 by default) which controls the number of digits after the comma / dot / whatever.
usage: ```
humanize(new Date()) // -> 'just now'
humanize(Date.parse('04 Dec 1995 00:12:00 GMT')) // -> '22 years ago'
humanize(Date.parse('04 Dec 1995 00:12:00 GMT'), 3) // -> '22.403 years ago'
```
*/
  humanize: (time, n=0) => [
      [0, 'second', 'seconds'],
      [60, 'minute', 'minutes'],
      [3600, 'hour', 'hours'],
      [86400, 'day', 'days'],
      [604800, 'week', 'weeks'],
      [2629746, 'month', 'months'], // 30.436875 days per month
      [31556925, 'year', 'years'], // 365.2421897 days per year (86400 * 365.241897 rounded a bit (by ~190ms down))
      [3155692500, 'century', 'centuries'],
      [31556925000, 'millennium', 'millennia']
    ].map((item, i, ar, m=Math.pow(10,n), s=(+new Date() - (time ? time.constructor === Date ? time.getTime() : +new Date(time || +new Date()) : +new Date())) / 1000) =>
      (s<0?-s:s > item[0]) ?
        [
          (((s<0?-s:s / item[0] * m + 0.5)|0)/m),
          (((s<0?-s:s / item[0] * m + 0.5)|0)/m) === 1 ? item[1] : item[2],
          s === s<0?-s:s ? 'ago' : 'from now'
        ].join(' ') : ((s<0?-s:s === 0) ? 'just now' : ''))
      .filter(x => x).reverse()[0]
  /*
  this is the worst code I've written in a while and it was hella fun
  quick explanation what the code does:
  the big array contains seconds and the associated unit
  (and the plural version of the unit (e.g. minute and minutes))
  then mapping over the array, after that the returning array is
  filtered and all falsy values are sorted out. After that the
  array is reversed and the first value is returned. This has
  the same effect as setting a variable outside of the scope of
  map and setting that variable each time to something different
  (and only setting it if the value that would normally be returned
  is not falsy). In that case forEach should be used instead of map.
  Inside the map function (or rather in the arguments of that function
  because ES6) the given time is first converted to a valid time
  string (the time can be a DateString, a number, a DateObject, or
  null; incase of null the current time is used) and then subtracted
  from the current Date and after that devided by 1000. This is done to
  get the difference in seconds rather than milliseconds.
  lets refer to the absolute value of that difference as  SA. If SA is bigger
  than the first index of the array then an array is created with 3 values and
  then joined together by spaces. If not and SA is equal to 0 then 'just now'
  is returned since both Dates are equal (atleast down to the second). Else ''
  is returned but this should not ever happen because an absolute value can't be
  smaller than 0.
  Inside the array that is later joined together by spaces the number and unit are
  calculated. Additionally 'ago' is added if SA matches the difference (the date
  is in the past); If SA is unequal to the difference 'from now' is added (the date
  is in the future).
  The 2 values that are calculated are being calculated as follows:
    (((s<0?-s:s / item[0] * m + 0.5)|0)/m)
    this could be rewritten as:
    Math.round(SA / item[0] * m) / m
    m controls the decimal places (its 10^(the 2nd argument aka n))
    (((s<0?-s:s / item[0] * m + 0.5)|0)/m) === 1 ? item[1] : item[2]
    Math.round(SA / item[0] * m) / m === 1 ? item[1] : item[2]
    it just checks if the first value is a 1 or another number and
    returns the singular or plural form of the unit respectivly
  */

  /*
  minified version:
  */

  /*
  let x = ((t,n=0,y=+new Date())=>
    [[0,'second'],[60,'minute'],
     [3600,'hour'],[86400,'day'],
     [604800,'week'],[2629746,'month'],
     [31556925,'year'],[3155692500,'century','centuries'],
     [31556925000,'millennium','millennia']]
  .map((x,i,_,m=Math.pow(10,n),s=(y-(t?t.constructor===Date?t.getTime():+new Date(t||y):y))/1000)=>
    (s<0?-s:s>x[0])?
      [(((s<0?-s:s/x[0]*m+0.5)|0)/m)
      ,(((s<0?-s:s/x[0]*m+0.5)|0)/m)===1?x[1]:x[2]||x[1]+'s'
      ,s===s<0?-s:s?'ago':'from now']
    .join(' '):((s<0?-s:s===0)?'just now':''))
    .filter(x=>x).reverse()[0])
  let y = (t,n=0,y=+new Date())=>[[0,'second'],[60,'minute'],[3600,'hour'],[86400,'day'],[604800,'week'],[2629746,'month'],[31556925,'year'],[3155692500,'century','centuries'],[31556925000,'millennium','millennia']].map((x,i,_,m=Math.pow(10,n),s=(y-(t?t.constructor===Date?t.getTime():+new Date(t||y):y))/1000)=>(s<0?-s:s>x[0])?[(((s<0?-s:s/x[0]*m+0.5)|0)/m),(((s<0?-s:s/x[0]*m+0.5)|0)/m)===1?x[1]:x[2]||x[1]+'s',s===s<0?-s:s?'ago':'from now'].join(' '):((s<0?-s:s===0)?'just now':'')).filter(x=>x).reverse()[0]
  */
}


export default dates
