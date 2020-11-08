import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubs: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubs = interval(1000).subscribe(count => {
    //     console.log(count);
    //   });
    const customIntervalObservable = Observable.create(
      (observer) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          count++;
        }, 1000);
      }
    );
    this.firstObsSubs = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  // To destroy an observable it's necessary to store the subscription
  //  thar return the observable in a property of type subscription,
  //  then used in Angular's method onDestroy, to destroy the subscription
  //  so that also stop the observable.
  ngOnDestroy(): void {
    this.firstObsSubs.unsubscribe();
  }
}
