import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { FormElementData } from '../../models/form.model'

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showOptionsAdd = false
  @Input() groups!: Group[]

  @Output() fromData = new EventEmitter<FormElementData>()
  @Output() deletedGroupId = new EventEmitter<number>()
  @ViewChild('container', {static: true}) containerRef!: ElementRef<HTMLDivElement>

  toggleOpen() {
    if(typeof document != 'undefined') {
      this.containerRef.nativeElement.classList.toggle('open')
    }
  }

  toggleOptionsAdd() {
    this.showOptionsAdd = !this.showOptionsAdd
  }

  openForm(type: FormElementData['type']) {
    this.fromData.emit({type})
  }

  openEditForm(group: FormElementData) {
    this.fromData.emit(group)
  }

  deleteGroup(groupId: number) {
    this.deletedGroupId.emit(groupId)
  }
}
