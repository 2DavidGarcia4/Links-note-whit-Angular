import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Group, Tooltip, Option, FocusedElement, Link } from 'src/app/models';
import { version } from '../../../data';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpen = false
  version = version
  @Input() groups!: Group[]
  @Input() links!: Link[]
  @Input() option: Option | undefined

  @Output() deletedGroupId = new EventEmitter<number>()
  @Output() tooltip = new EventEmitter<Tooltip | undefined>()
  @Output() optionEvent = new EventEmitter<Option | undefined>()
  @Output() focusedElement = new EventEmitter<FocusedElement | undefined>()
  @Output() configRefOutput = new EventEmitter<ElementRef<HTMLDivElement>>()

  @ViewChild('container', {static: true}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChild('principalImg', {static: true}) principalImgRef!: ElementRef<HTMLDivElement>
  @ViewChild('addOption', {static: true}) addOptionRef!: ElementRef<HTMLDivElement>

  constructor(private router: Router) {}

  toggleOpen() {
    if(typeof document != 'undefined') {
      this.isOpen = !this.isOpen
      this.containerRef.nativeElement.classList.toggle('open')
    }
  }

  emitFocusedElement(element?: FocusedElement) {
    console.log(element)
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
      const top = rect.top+Math.floor(rect.height/2)

      this.tooltip.emit({
        top,
        left: rect.left+rect.width+26,
        type: 'normal',
        content, 
        direction: 'left'
      })
    }
  }

  createOptionTooltip() {
    if(!this.isOpen){
      const rect = this.addOptionRef.nativeElement.getBoundingClientRect()
      if(typeof window != 'undefined'){
        const wh = window.innerHeight
        const top = rect.top+Math.floor(rect.height/2)

        this.tooltip.emit({
          top: (top + 24) > wh ? wh-24 : top,
          left: rect.left+rect.width+26,
          type: 'normal',
          content: 'Agregar/crear', 
          direction: 'left'
        })
      }
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
      if(typeof window != 'undefined'){
        const wh = window.innerHeight
        const top = rect.top+Math.floor(rect.height/2)

        this.optionEvent.emit({
          top: (top + 50) > wh ? wh-50 : top,
          left: rect.left+rect.width+26,
          type
        })
      }
    }
  }

  emitConfigRef(ref: ElementRef<HTMLDivElement>) {
    this.configRefOutput.emit(ref)
  }

  redirect(elemnteRef: MouseEvent, groupId: number) {
    this.router.navigate([`group/${groupId}`])
    const groupElement = elemnteRef.currentTarget as HTMLElement || HTMLLinkElement
    
    if(!groupElement.classList.contains('selected')){
      if(typeof document != 'undefined'){
        const gropups = document.querySelectorAll('.groups-element')
        gropups.forEach(gre=> {
          gre.classList.remove('selected')
        })
        groupElement.classList.add('selected')
      }
    }
  }
}
