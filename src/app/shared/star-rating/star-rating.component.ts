import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() public starCount: number;
  @Output() public onRated = new EventEmitter<number>();

  public ratings: number[];
  public currentRating = 0;
  constructor() { }

  ngOnInit(): void {
    this.ratings = [...Array(this.starCount).keys()]
  }

  public setRating(rating: number) {
    this.currentRating = rating;
    this.onRated.emit(rating);
  }

}
