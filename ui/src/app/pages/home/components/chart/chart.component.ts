import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() xValues: any[];
  @Input() yValues: any[];
  @Input() titleSettings;

  options = {
    responsive: true,
    title: {}
  };

  constructor() { }

  ngOnInit(): void {
    this.options.title = this.titleSettings;
  }

}
