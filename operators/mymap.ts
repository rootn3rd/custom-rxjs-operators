import { Observable, Observer } from 'rxjs';

const myMap =
  <T, TRes>(mapperFn: (val: T) => TRes) =>
  (source: Observable<T>) => {
    return new Observable((observer: Observer<TRes>) => {
      const subscription = source.subscribe({
        next: (n: T) => observer.next(mapperFn(n)),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete(),
      });

      return subscription;
    });
  };

export { myMap };
