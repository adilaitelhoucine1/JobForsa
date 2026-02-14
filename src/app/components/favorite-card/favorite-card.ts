import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteOffer } from '../../model/favorite-offer';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-card.html',
  styleUrl: './favorite-card.css'
})
export class FavoriteCardComponent {
  @Input() favorite!: FavoriteOffer;
  @Output() removeFavoriteEvent = new EventEmitter<number>();

  onRemove(): void {
    if (this.favorite.id) {
      this.removeFavoriteEvent.emit(this.favorite.id);
    }
  }
}

