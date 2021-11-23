import { Observable, Observer } from 'rxjs';

const myInterval = (period: number) => {
  return new Observable((observer: Observer<any>) => {
    let index = 0;
    const id = setInterval(() => observer.next(index++), period);

    return () => clearInterval(id);
  });
};

export { myInterval };
