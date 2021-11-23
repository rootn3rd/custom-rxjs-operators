import { Observable, Observer, Subscription } from 'rxjs';

const mySwitchMap =
  <T>(project: (n: T) => Observable<any>) =>
  (source: Observable<T>) => {
    let innerSubscription = null;
    let innerSubscriptionActive = false;
    let outerSubscriptionActive = true;

    return new Observable((observer: Observer<T>) => {
      const subscription = source.subscribe({
        next: (nxt) => {
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }

          innerSubscriptionActive = true;

          innerSubscription = project(nxt).subscribe({
            next: (v) => observer.next(v),
            error: (err) => observer.error(err),
            complete: () => {
              innerSubscriptionActive = false;
              if (!outerSubscriptionActive) {
                observer.complete();
              }
            },
          });
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          outerSubscriptionActive = false;
          if (!innerSubscriptionActive) {
            observer.complete();
          }
        },
      });

      return subscription;
    });
  };

export { mySwitchMap };
