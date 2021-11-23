import './style.css';

import { of, map, Observable, Observer, interval, take, from } from 'rxjs';

import { myOperator, myOperatorWithParameter } from './operators/myoperator';
import { myCombineLatest } from './operators/mycombineLatest';
import { myFilter } from './operators/myfilter';
import { myInterval } from './operators/myinterval';
import { myMap } from './operators/mymap';
import { myMerge } from './operators/mymerge';
import { myMergeMap } from './operators/mymergemap';

/* GENERIC TEMPLATE FOR ALL OPERATORS

import { Observable, Observer } from 'rxjs';

const myMergeMap = <T>(source: Observable<T>) => {
  return new Observable((observer: Observer<T>) => {
    
    const subscription = source.subscribe({
      next: (n) => {},
      error: (err) => {},
      complete: () => {},
    });

    return subscription;
  });
};

export { myMergeMap };


*/

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

const intSub = myInterval(200)
  .pipe(take(4))
  .subscribe((x) => console.log('myInterval:', x));

setTimeout(() => intSub.unsubscribe(), 400);

from([1, 2, 3])
  .pipe(myMap((t) => t * 2))
  .subscribe((x) => console.log('myMap:', x));

let m1 = from([10, 20, 30]);
let m2 = from([100, 200]);
myMerge(m1, m2).subscribe((x) => console.log('myMerge:', x));

const getObs = (val) => from([val + 1, val + 1, val + 1]);
from([1, 3, 5])
  .pipe(myMergeMap(getObs))
  .subscribe((x) => console.log('myMergeMap', x));
