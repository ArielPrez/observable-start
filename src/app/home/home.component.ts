import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubs: Subscription;
  constructor() { }

  ngOnInit() {
    this.firstObsSubs = interval(1000).subscribe(count => {
        console.log(count);
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
