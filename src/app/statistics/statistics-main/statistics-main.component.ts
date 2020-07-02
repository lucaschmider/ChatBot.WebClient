import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-main',
  templateUrl: './statistics-main.component.html',
  styleUrls: ['./statistics-main.component.scss']
})
export class StatisticsMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  colorScheme = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A']
  };

  refLines = [
    { value: 80, name: 'Ziel' },
    { value: 60, name: 'Aktueller Durchschnitt' },
    { value: 30, name: 'Ursprünglicher Durchschnitt' }
  ];

  data = [
    {
      "name": "Versandbüro",
      "series": [
        {
          "name": "Aug",
          "value": 14
        },
        {
          "name": "Sep",
          "value": 35
        },
        {
          "name": "Oct",
          "value": 4
        },
        {
          "name": "Nov",
          "value": 17
        },
        {
          "name": "Dec",
          "value": 14
        },
        {
          "name": "Jan",
          "value": 35
        }
      ]
    },

    {
      "name": "Personalabteilung",
      "series": [
        {
          "name": "Aug",
          "value": 0
        },
        {
          "name": "Sep",
          "value": 50
        },
        {
          "name": "Oct",
          "value": 60
        },
        {
          "name": "Nov",
          "value": 80
        },
        {
          "name": "Dec",
          "value": 90
        },
        {
          "name": "Jan",
          "value": 60
        }
      ]
    }
  ];
}
