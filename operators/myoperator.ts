import { Observable, Observer } from 'rxjs';

const myOperator = <T>(source: Observable<T>) => {
  return new Observable((observer: Observer<T>) => {
    const subscription = source.subscribe({
      next: (next: T) => {
        console.log('next', next);
        observer.next(next);
      },
      error: (error: any) => {
        console.log('error', error);
        observer.error(error);
      },
      complete: () => {
        console.log('completed');
        observer.complete();
      },
    });

    return subscription;
  });
};

const myOperatorWithParameter =
  (identifier: string) =>
  <T>(source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (next: T) => {
          console.log('next', next);
          console.log('identifier', identifier);
          observer.next(next);
        },
        error: (error: any) => {
          console.log('error', error);
          observer.error(error);
        },
        complete: () => {
          console.log('completed');
          observer.complete();
        },
      });

      return subscription;
    });
  };

export { myOperator, myOperatorWithParameter };
