import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UIService } from '../../services/ui.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
public sidebarOpen$:Observable<boolean>;

constructor(private uiService: UIService) {
  this.sidebarOpen$ = this.uiService.getSidebarOpen();
}

ngOnInit(): void {}
}
