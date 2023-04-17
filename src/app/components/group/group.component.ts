import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Group, FocusedElement, Tooltip, Option } from 'src/app/models';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() group!: Group;
  @Input() isOpen!: Boolean;
  @Input() option: Option | undefined

  @Output() tooltip = new EventEmitter<Tooltip | undefined>()
  @Output() optionEvent = new EventEmitter<Option | undefined>()
  @Output() focusedElement = new EventEmitter<FocusedElement | undefined>()

  @ViewChild('config', {static: true}) configRef!: ElementRef<HTMLDivElement> 
  @ViewChild('options', {static: true}) optionsRef!: ElementRef<HTMLDListElement>
  @ViewChild('icon', {static: true}) iconRef!: ElementRef<HTMLDivElement>


  toggleOptions(type: Option['type']) {
    if(this.option){
      this.optionEvent.emit(undefined)
    
    }else{
      const rect = this.configRef.nativeElement.getBoundingClientRect()
      this.optionEvent.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+26,
        type
      })
      this.focusedElement.emit({...this.group, type: 'group'})
    }
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
