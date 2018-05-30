import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.html',
})
export class Search {
  @Output() searchInput = new EventEmitter();
  @Output() searchClear: EventEmitter<UIEvent> = new EventEmitter<UIEvent>();
  @Output() searchBlur: EventEmitter<UIEvent> = new EventEmitter<UIEvent>();
  @Output() searchFocus: EventEmitter<UIEvent> = new EventEmitter<UIEvent>();

  filled = false;
  searchValue: string;

  onInput() {
    if (this.searchValue.length) {
      this.filled = true;
    } else {
      this.filled = false;
    }

    if (this.searchValue.length >= 1) {
      this.searchInput.emit(this.searchValue);
    } else {
      this.searchClear.emit();
    }
  }

  onClear() {
    this.searchValue = '';
    this.filled = false;
    this.searchClear.emit();
  }
}
