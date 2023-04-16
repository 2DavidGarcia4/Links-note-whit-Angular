import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormElementData } from 'src/app/models/form.model';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  showOptionsGroup = false
  @Input() group!: Group;
  @Output() fromData = new EventEmitter<FormElementData>()
  @Output() deletedGroupId = new EventEmitter<number>()
  @ViewChild('config', {static: true}) configRef!: ElementRef<HTMLDivElement> 
  @ViewChild('options', {static: true}) optionsRef!: ElementRef<HTMLDListElement>

  togglePersistConfig() {
    this.configRef.nativeElement.classList.toggle('persist')
    this.showOptionsGroup = !this.showOptionsGroup
  }

  openEditForm() {
    this.togglePersistConfig()
    this.fromData.emit({type: 'group', element: {...this.group}})
  }

  deleteGroup() {
    this.togglePersistConfig()
    this.deletedGroupId.emit(this.group.id)
  }
}
