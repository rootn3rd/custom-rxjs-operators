import { Observable, Observer } from 'rxjs';

const NONE = {};
const myCombineLatest = (...observables: Array<Observable<any>>) => {
  return new Observable((observer: Observer<Array<any>>) => {
    let values = Array.from({ length: observables.length }).map((_) => NONE);
    let toRespond = observables.length;
    let numObservables = observables.length;
    let numObsCompleted = 0;

    const subscriptions = observables.map((obs, i) =>
      obs.subscribe({
        next: (n: any) => {
          // keeping reference of last next of every observable
          // have all observables emitted
          if (values[i] === NONE) {
            --toRespond;
          }
          values[i] = n;
          if (toRespond === 0) {
            observer.next(values);
          }
        },
        error: (err: any) => {
          observer.error(err);
        },
        complete: () => {
          // if all are completed
          numObsCompleted++;
          if (numObsCompleted == numObservables) {
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

export { myCombineLatest };
