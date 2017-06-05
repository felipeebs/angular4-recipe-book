import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBUxW2LWWmQD4y7vjN4Ju_X8YpImjT_0Ns',
      authDomain: 'ng-course-recipes.firebaseapp.com'
    });
  }
}
