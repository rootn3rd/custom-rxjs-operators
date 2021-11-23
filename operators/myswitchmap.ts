import { Observable, Observer, Subscription } from 'rxjs';

const mySwitchMap =
  <T>(project: (n: T) => Observable<any>) =>
  (source: Observable<T>) => {
    const allSubscriptions = new Subscription();
    let active = 0;
    let outerSubCompleted = false;
    let prevSub = null;
    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (nxt) => {
          if (prevSub) {
            allSubscriptions.remove(prevSub);
            prevSub.unsubscribe();
          }

          const innerObs = project(nxt);

          const innerSub = innerObs.subscribe({
            next: (v) => observer.next(v),
            error: (err) => observer.error(err),
            complete: () => {
              active--;
              if (active == 0 && outerSubCompleted) {
                observer.complete();
              }
            },
          });

          prevSub = innerSub;

          allSubscriptions.add(innerSub);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          outerSubCompleted = true;
          if (active == 0) {
            observer.complete();
          }
        },
      });

      allSubscriptions.add(subscription);
      return allSubscriptions;
    });
  };

export { mySwitchMap };
