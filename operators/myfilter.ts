import { Observable, Observer } from 'rxjs';

const myFilter =
  <T>(filterFn: (val: T) => boolean) =>
  (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (n: T) => {
          if (filterFn(n)) {
            observer.next(n);
          }
        },
        error: (err: any) => observer.error(err),
        complete: () => observer.complete(),
      });

      return subscription;
    });
  };

export { myFilter };
