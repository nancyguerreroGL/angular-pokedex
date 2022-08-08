import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user!: any

  @Output() logout = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.logout.emit();
  }

}
