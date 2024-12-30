import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UIService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
public isSidebarOpen:boolean=false;
private sub: Subscription = new Subscription();
constructor(private uiService: UIService) {}

ngOnInit() {
  this.sub.add(
    this.uiService.getSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    })
  );
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

public toggleSidebar(): void {
  this.uiService.toggleSidebar(!this.isSidebarOpen);
}
}
