import { Observable, Observer } from 'rxjs';

const myTimer = (timeTillFirstValue: number, periodTime: number) => {
  return new Observable((observer: Observer<number>) => {
    let interval = null;
    const timeOut = setTimeout(() => {
      let count = 0;
      interval = setInterval(() => {
        observer.next(count++);
      }, periodTime);
    }, timeTillFirstValue);

    return () => {
      clearTimeout(timeOut);
      clearInterval(interval);
    };
  });
};

export { myTimer };
