import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-remote',
  standalone: true,
  imports: [CommonModule],
  template: `
    <iframe 
      [src]="remoteUrl" 
      class="remote-iframe"
      title="Admin Module"
    ></iframe>
  `,
  styles: [`
    .remote-iframe {
      width: 100%;
      height: 100vh;
      border: none;
      display: block;
    }
  `]
})
export class AdminRemoteComponent implements OnInit {
  remoteUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.remoteUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4201');
  }
}
