import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  isDark = false
  @ViewChild('switchTheme', {static: true}) switchThemeRef!: ElementRef<HTMLDivElement>

  constructor(private cdr: ChangeDetectorRef) {}

  //? Se llama o ejecuta despues de haver inicializado todas las propiedades
  ngOnInit() {
    if(typeof localStorage != 'undefined'){
      const localTheme = localStorage.getItem('dark')
      if(localTheme && localTheme == 'yes'){
        this.isDark = true
        document.body.classList.add('dark')
        this.switchThemeRef.nativeElement.classList.add('dark')
      }
    }
  }

  toggleTeme() {
    this.isDark = !this.isDark
    this.switchThemeRef.nativeElement.classList.toggle('dark')
    if(typeof document != 'undefined'){
      document.body.classList.toggle('dark')
    }

    if(typeof localStorage != 'undefined'){
      localStorage.setItem('dark', this.isDark ? 'yes' : 'no')
    }
  }
  
}
