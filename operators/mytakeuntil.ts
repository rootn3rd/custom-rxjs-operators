import { Observable, Observer } from 'rxjs';

const myTakeUntil =
  <T>(trigger$: Observable<any>) =>
  (source: Observable<any>) => {
    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (n) => {
          observer.next(n);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          observer.complete();
        },
      });

      trigger$.subscribe({
        next: (n) => {
          observer.complete();
          subscription.unsubscribe();
        },
      });
      return subscription;
    });
  };
export { myTakeUntil };
