import './style.css';

import { of, map, Observable, Observer, interval, take } from 'rxjs';

import { myOperator, myOperatorWithParameter } from './operators/myoperator';
import { myCombineLatest } from './operators/mycombineLatest';
import { myFilter } from './operators/myfilter';
import { myInterval } from './operators/myinterval';

const print = (groupName: string, execute: () => void) => {
  console.group(groupName);
  execute();
  console.groupEnd();
};

print('myOperator', () => of(1).pipe(myOperator).subscribe(console.log));

print('myOperatorWithParameter', () =>
  of(2).pipe(myOperatorWithParameter('jamesbond')).subscribe(console.log)
);

print('myCombineLatest', () => {
  let obs1 = interval(20).pipe(take(2));
  let obs2 = interval(20).pipe(take(2));
  const sub = myCombineLatest(obs1, obs2).subscribe(console.log);
  //sub.unsubscribe()
});

print('myFilter', () => {
  let obs1 = interval(30).pipe(
    myFilter((f) => f % 2 == 0),
    take(4)
  );
  obs1.subscribe(console.log);
});

print('myInterval', () => {
  myInterval(200)
    .pipe(take(10))
    .subscribe((x) => console.log('myInterval:', x));
});
