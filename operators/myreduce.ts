import { Observable, Observer } from 'rxjs';

const myReduce =
  <T>(accumulator: (acc: T, cur: T) => T, seed: T) =>
  (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      let acc = seed;
      const subscription = source.subscribe({
        next: (n) => {
          acc = accumulator(acc, n);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          observer.next(acc);
          observer.complete();
        },
      });

      return subscription;
    });
  };

export { myReduce };
