import { Component } from '@angular/core';
import { version } from '../../../data'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  version = version

}
