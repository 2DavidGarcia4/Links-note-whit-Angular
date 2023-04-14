import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { FormCreateData } from '../../models/form.model'

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showOptionsAdd = false
  groups: Group[] = [
    {
      id: 1,
      name: 'Deporte',
      description: 'deporte description',
      color: '#07da07',
      emoji: '🏃'
    },
    {
      id: 2,
      name: 'Tecnologia1214161820',
      description: 'Tecnologia description',
      color: '#28ABE1',
    },
    {
      id: 3,
      name: 'Juegos',
      description: 'Juegos description',
      color: '#28ABE1',
      emoji: '🤪'
    },
  ]

  @Output() fromData = new EventEmitter<FormCreateData>()
  @ViewChild('container', {static: true}) containerRef!: ElementRef<HTMLDivElement>

  toggleOpen() {
    if(typeof document != 'undefined') {
      this.containerRef.nativeElement.classList.toggle('open')
    }
  }

  toggleOptionsAdd() {
    this.showOptionsAdd = !this.showOptionsAdd
  }

  openForm(type: FormCreateData['type']) {
    this.fromData.emit({type})
  }
}
