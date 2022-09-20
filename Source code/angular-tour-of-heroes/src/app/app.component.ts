import { Component } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ANCC';

  ShowAlert(){
    alert("Developed by Sheikh Wahab Mahmood\nfor Australian National Character Checks (ANCC)\nif you liked my work please contact me at 0451484378");
  }
}
