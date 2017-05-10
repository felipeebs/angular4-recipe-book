import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeComponent = 'recipes';

  activeComponentChanged(component: string) {
    this.activeComponent = component;
  }
}
