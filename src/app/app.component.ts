import { Component } from '@angular/core';

import { AuthenticationService} from './Shared/authentication/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pexshop';
  constructor(public authSvc:AuthenticationService){

  }
}
