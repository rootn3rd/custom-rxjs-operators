import './style.css';

import { of, map, Observable, Observer, interval, take, from } from 'rxjs';

import { myOperator, myOperatorWithParameter } from './operators/myoperator';
import { myCombineLatest } from './operators/mycombineLatest';
import { myFilter } from './operators/myfilter';
import { myInterval } from './operators/myinterval';

of(1)
  .pipe(myOperator)
  .subscribe((x) => console.log('myOperator:', x));

of(2)
  .pipe(myOperatorWithParameter('jamesbond'))
  .subscribe((x) => console.log('myOperatorWithParameter:', x));

let obs1 = from([1, 2]);
let obs2 = from([3, 4]);
const sub = myCombineLatest(obs1, obs2).subscribe((x) =>
  console.log('myCombineLatest', x)
);
//sub.unsubscribe()

from([1, 2, 3, 4, 5, 6])
  .pipe(
    myFilter((f) => f % 2 == 0),
    take(4)
  )
  .subscribe((x) => console.log('myFilter:', x));

myInterval(200)
  .pipe(take(4))
  .subscribe((x) => console.log('myInterval:', x));
