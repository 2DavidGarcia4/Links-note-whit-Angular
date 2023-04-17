import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormElementData } from 'src/app/models/form.model';
import { Group } from 'src/app/models/group.model';
import { Tooltip } from 'src/app/models/tooltipo.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  showOptionsGroup = false
  @Input() group!: Group;
  @Input() isOpen!: Boolean;
  @Output() fromData = new EventEmitter<FormElementData>()
  @Output() deletedGroupId = new EventEmitter<number>()
  @Output() tooltip = new EventEmitter<Tooltip | undefined>()
  @ViewChild('config', {static: true}) configRef!: ElementRef<HTMLDivElement> 
  @ViewChild('options', {static: true}) optionsRef!: ElementRef<HTMLDListElement>
  @ViewChild('icon', {static: true}) iconRef!: ElementRef<HTMLDivElement>

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

  createTooltip() {
    if(!this.isOpen){
      const rect = this.iconRef.nativeElement.getBoundingClientRect()
      this.tooltip.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+26,
        content: this.group.name, 
        direction: 'left'
      })
    }
  }

  deleteTooltip() {
    this.tooltip.emit(undefined)
  }
}
