import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  @Input() keyword: string = '';
  @Input() location: string = '';
  @Input() loading: boolean = false;
  @Input() placeholder: { keyword: string; location: string } = {
    keyword: 'Job title or keyword',
    location: 'Location'
  };

  @Output() keywordChange = new EventEmitter<string>();
  @Output() locationChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

  onKeywordChange(value: string) {
    this.keyword = value;
    this.keywordChange.emit(value);
  }

  onLocationChange(value: string) {
    this.location = value;
    this.locationChange.emit(value);
  }

  onSearch() {
    this.search.emit();
  }

  onEnter() {
    this.onSearch();
  }
}
