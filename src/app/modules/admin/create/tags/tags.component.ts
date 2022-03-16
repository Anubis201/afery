import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent {
  @Input() tags: string[]

  @Output() changeTag = new EventEmitter<string[]>()

  tagControl = new FormControl()

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.changeTag.emit([...this.tags, value]);
    }

    event.chipInput!.clear();
    this.tagControl.setValue(null);
  }

  remove(fruit: string) {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      const val = this.tags;
      val.splice(index, 1);
      this.changeTag.emit(val);
    }
  }
}
