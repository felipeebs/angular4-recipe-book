import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() activeComponentChanged = new EventEmitter<string>();

  onChangeActiveComponent(component: string) {
    this.activeComponentChanged.emit(component);
  }
}
