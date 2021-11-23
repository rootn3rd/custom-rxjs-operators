import { Observable, Observer } from 'rxjs';

const myOf = <T>(...data: Array<any>) => {
  return new Observable((observer: Observer<T>) => {
    data.forEach((t) => observer.next(t));
    observer.complete();
  });
};

export { myOf };
