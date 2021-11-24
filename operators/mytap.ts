import { Observable, Observer } from 'rxjs';

const myTap =
  <T>(sideEffectFn: (val: T) => void) =>
  (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (n) => {
          sideEffectFn(n);
          observer.next(n);
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

export { myTap };
