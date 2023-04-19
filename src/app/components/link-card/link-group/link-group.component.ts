import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { Group } from 'src/app/models';

@Component({
  selector: 'app-link-group',
  templateUrl: './link-group.component.html',
  styleUrls: ['./link-group.component.scss']
})
export class LinkGroupComponent implements OnChanges {
  group?: Group
  @Input() groupId!: number
  @Input() groups!: Group[]

  constructor(private componentRef: ElementRef<HTMLDivElement>) {}

  ngOnChanges() {
    this.group = this.groups.find(g=> g.id == this.groupId)
    if(this.componentRef && this.group){
      this.componentRef.nativeElement.style.backgroundColor = this.group.color+60
      this.componentRef.nativeElement.style.borderColor = this.group.color
      this.componentRef.nativeElement.setAttribute('data-group', this.group.name)
    }
  }
}
