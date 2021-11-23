import { Observable, Observer } from 'rxjs';

const myScan =
  <T>(accumulator: (acc: T, cur: T) => T, seed: T) =>
  (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      let acc = seed;
      const subscription = source.subscribe({
        next: (n) => {
          acc = accumulator(acc, n);
          observer.next(acc);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          observer.complete();
        },
      });

      return subscription;
    });
  };

export { myScan };
