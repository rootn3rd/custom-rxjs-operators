import { Observable, Observer } from 'rxjs';

const myTap =
  <T>(
    nextFn: (val: T) => void,
    errorFn: (err: any) => void,
    completeFn: () => void
  ) =>
  (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (n) => {
          nextFn(n);
          observer.next(n);
        },
        error: (err) => {
          errorFn(err);
          observer.error(err);
        },
        complete: () => {
          completeFn();
          observer.complete();
        },
      });
      return subscription;
    });
  };

export { myTap };
