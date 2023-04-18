import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Group, Tooltip, Option, FocusedElement } from 'src/app/models';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpen = false
  @Input() groups!: Group[]
  @Input() option: Option | undefined

  @Output() deletedGroupId = new EventEmitter<number>()
  @Output() tooltip = new EventEmitter<Tooltip | undefined>()
  @Output() optionEvent = new EventEmitter<Option | undefined>()
  @Output() focusedElement = new EventEmitter<FocusedElement | undefined>()
  @Output() configRefOutput = new EventEmitter<ElementRef<HTMLDivElement>>()

  @ViewChild('container', {static: true}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChild('principalImg', {static: true}) principalImgRef!: ElementRef<HTMLDivElement>
  @ViewChild('addOption', {static: true}) addOptionRef!: ElementRef<HTMLDivElement>

  toggleOpen() {
    if(typeof document != 'undefined') {
      this.isOpen = !this.isOpen
      this.containerRef.nativeElement.classList.toggle('open')
    }
  }

  emitFocusedElement(element?: FocusedElement) {
    this.focusedElement.emit(element)
  }

  emitTooltip(tooltipData: Tooltip | undefined) {
    this.tooltip.emit(tooltipData)
  }

  emitOption(optionData: Option | undefined) {
    this.optionEvent.emit(optionData)
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

  toggleOptions(type: Option['type']) {
    if(this.option){
      this.optionEvent.emit(undefined)
    
    }else{
      const rect = this.addOptionRef.nativeElement.getBoundingClientRect()
      this.optionEvent.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+26,
        type
      })
    }
  }

  emitConfigRef(ref: ElementRef<HTMLDivElement>) {
    this.configRefOutput.emit(ref)
  }
}
