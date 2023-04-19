import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FocusedElement, Group, Link, Option } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  links?: Link[]
  groups?: Group[]
  option?: Option

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.groups = this.appComponent.groups
    this.links = this.appComponent.links
    this.option = this.appComponent.option
  }

  setFocusedElement(element?: FocusedElement) { 
    this.appComponent.focusedElement = element
  }

  // updateOption(op: Option | undefined) {
  //   console.log(op)
  //   this.option = op
  //   this.appComponent.option = op
  // }

  setFocusedOptionRef(ref: ElementRef<HTMLDivElement>) {
    this.appComponent.focusedOptionRef = ref
  }
}
