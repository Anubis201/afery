import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.metaTags();
  }

  private metaTags() {
    this.titleService.setTitle('Afery - Bulwar to rozmowy i dyskusje');
    this.meta.updateTag({ name:'description', content:'Na naszym bulwarze możesz pisać o wszystkim bez żadnej cenzury.' }, "name='description'");
  }
}
