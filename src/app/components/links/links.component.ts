import { Component, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FocusedElement, Group, Link, Option } from 'src/app/models';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnChanges {
  @Input() links?: Link[]
  @Input() groups?: Group[]
  @Input() option?: Option
  @Input() groupId!: number
  filteredLinks?: Link[]

  constructor(private appComponent: AppComponent) {}

  ngOnChanges() {
    console.log('hola')
    this.filteredLinks = this.links?.filter(l=> l.groupId == this.groupId)
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
