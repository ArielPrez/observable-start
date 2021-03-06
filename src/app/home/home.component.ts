import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubs: Subscription;
  count = 5;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubs = interval(1000).subscribe(count => {
    //     console.log(count);
    //   });
    const customIntervalObservable = new Observable(
      (observer) => {
        setInterval(() => {
          observer.next(this.count);
          if (this.count === 1) {
            observer.complete();
          }else if ( this.count < 1 ){
            observer.error(new Error('The count is now ' + this.count + '! / Session logged off.'));
          }else{
            this.count--;
          }
        }, 1000);
      }
    );

    this.firstObsSubs = customIntervalObservable.pipe(
      filter((data: number) => {
        return data <= 4;
      }),
      map((data: number) => {
          return 'Round: ' + (data - 1);
        })
      ).subscribe(data => {
      console.log(data);
      }, error => {
        console.log(error.message);
        alert(error.message);
        this.count = 5;
      }, () => {
        console.log('Completed!');
      }
    );
  }

  // To destroy an observable it's necessary to store the subscription
  //  thar return the observable in a property of type subscription,
  //  then used in Angular's method onDestroy, to destroy the subscription
  //  so that also stop the observable.
  ngOnDestroy(): void {
    this.firstObsSubs.unsubscribe();
  }
}
