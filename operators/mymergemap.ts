import { Observable, Observer, Subscription } from 'rxjs';

const myMergeMap =
  <T>(project: (val: T) => Observable<any>) =>
  (source: Observable<T>) => {
    let active = 0;
    let outerSubCompleted = false;
    const allSubscriptions = new Subscription();

    return new Observable((observer: Observer<any>) => {
      const subscription = source.subscribe({
        next: (n) => {
          active++;
          const innerSub = project(n).subscribe({
            next: (nxt) => observer.next(nxt),
            error: (error) => observer.error(error),
            complete: () => {
              active--;
              if (active === 0 && outerSubCompleted) {
                observer.complete();
              }
            },
          });

          allSubscriptions.add(innerSub);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => {
          outerSubCompleted = true;
          if (active === 0) {
            observer.complete();
          }
        },
      });

      allSubscriptions.add(subscription);
      return allSubscriptions;
    });
  };

export { myMergeMap };
