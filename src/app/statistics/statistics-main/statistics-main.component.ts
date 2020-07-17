import { Component, OnInit } from "@angular/core";
import { StatisticsService } from 'src/app/shared/services/statistics.service';

@Component({
  selector: "app-statistics-main",
  templateUrl: "./statistics-main.component.html",
  styleUrls: ["./statistics-main.component.scss"]
})
export class StatisticsMainComponent implements OnInit {
  public data: any;

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statisticsService.getUserSatisfaction().then(feedbacks => {
      this.data = feedbacks.map(feedback => {
        return {
          name: feedback.department,
          series: feedback.ratings.map(rating => {
            return {
              name: rating.time,
              value: rating.rating
            }
          })
        }
      })
    });
  }
  colorScheme = {
    domain: ["#08DDC1", "#FFDC1B", "#FF5E3A"]
  };


  refLines = [
    // { value: 80, name: "Ziel" },
    // { value: 60, name: "Aktueller Durchschnitt" },
    // { value: 30, name: "Ursprünglicher Durchschnitt" }
  ];


}
