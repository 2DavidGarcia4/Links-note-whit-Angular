import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { FormElementData } from '../../models/form.model'
import { Tooltip } from 'src/app/models/tooltipo.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showOptionsAdd = false
  isOpen = false
  @Input() groups!: Group[]

  @Output() fromData = new EventEmitter<FormElementData>()
  @Output() deletedGroupId = new EventEmitter<number>()
  @Output() tooltip = new EventEmitter<Tooltip | undefined>()
  @ViewChild('container', {static: true}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChild('principalImg', {static: true}) principalImgRef!: ElementRef<HTMLDivElement>
  @ViewChild('addOption', {static: true}) addOptionRef!: ElementRef<HTMLDivElement>

  toggleOpen() {
    if(typeof document != 'undefined') {
      this.isOpen = !this.isOpen
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

  emitTooltip(tooltipData: Tooltip | undefined) {
    this.tooltip.emit(tooltipData)
  }

  createTooltip(content: string) {
    if(!this.isOpen){
      const rect = this.principalImgRef.nativeElement.getBoundingClientRect()
      this.tooltip.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+26,
        content, 
        direction: 'left'
      })
    }
  }

  createOptionTooltip() {
    if(!this.isOpen){
      const rect = this.addOptionRef.nativeElement.getBoundingClientRect()
      this.tooltip.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+26,
        content: 'Agregar/crear', 
        direction: 'left'
      })
    }
  }

  deleteTooltip() {
    if(!this.isOpen){
      this.tooltip.emit(undefined)
    }
  }
}
