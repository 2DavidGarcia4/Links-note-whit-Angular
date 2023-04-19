import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FocusedElement, Group, Link, Option } from 'src/app/models';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  groupId!: number
  links?: Link[]
  groups?: Group[]
  option?: Option

  constructor(private route: ActivatedRoute, private appComponent: AppComponent) {}

  ngOnInit() {
    this.route.params.subscribe(params=> {
      this.groupId = params['groupId']
      this.links = this.appComponent.links.filter(l=> l.groupId == this.groupId)
    })

    this.groups = this.appComponent.groups
    this.option = this.appComponent.option
  }

  setFocusedElement(element?: FocusedElement) { 
    this.appComponent.focusedElement = element
  }

  updateOption(op: Option | undefined) {
    this.appComponent.option = op
  }

  setFocusedOptionRef(ref: ElementRef<HTMLDivElement>) {
    this.appComponent.focusedOptionRef = ref
  }
}
