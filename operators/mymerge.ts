import { Observable, Observer } from 'rxjs';

const myMerge = (...observables: Array<Observable<any>>) => {
  let total = observables.length;
  let numCompleted = 0;
  return new Observable((observer: Observer<any>) => {
    const subscriptions = observables.map((obs) =>
      obs.subscribe({
        next: (n) => observer.next(n),
        error: (err) => observer.error(err),
        complete: () => {
          numCompleted++;
          if (numCompleted == total) {
            observer.complete();
          }
        },
      })
    );

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  });
};

export { myMerge };
