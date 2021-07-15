import { Component, OnInit } from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loading = true;
  public codeMode = false;

  public titleSettings;

  public currentQuery;

  public queries = {
    medalsByCountry: {
      xKey: 'Olympics.team',
      yKeys: ['Olympics.count'],
      legendLabels: ['Count'],
      title: 'Medal Count by Country (Top 10)',
      query: {
        "dimensions": [
          "Olympics.team"
        ],
        "timeDimensions": [],
        "order": {
          "Olympics.count": "desc"
        },
        "measures": [
          "Olympics.count"
        ],
        "filters": [{
          "member": "Olympics.count",
          "operator": "gt",
          "values": [
            "0"
          ]
        }],
        "segments": [
          "Olympics.wonMedal"
        ],
        limit: 10
      }
    },
    avgHeightByCountry: {
      xKey: 'Olympics.team',
      yKeys: ['Olympics.avgHeight'],
      legendLabels: ['Height'],
      title: 'Average Height by Country',
      query: {
        "dimensions": [
          "Olympics.team"
        ],
        "timeDimensions": [],
        "order": {
          "Olympics.avgHeight": "desc"
        },
        "measures": [
          "Olympics.avgHeight"
        ],
        "filters": [
          {
            "member": "Olympics.avgHeight",
            "operator": "set"
          }
        ],
        "segments": [
          "Olympics.wonMedal"
        ]
      }
    },
    avgAgeBySport: {
      xKey: 'Olympics.sport',
      yKeys: ['Olympics.avgAge'],
      title: 'Average Age by Sport',
      legendLabels: ['Age'],
      query: {
        "dimensions": [
          "Olympics.sport"
        ],
        "timeDimensions": [],
        "order": {
          "Olympics.avgAge": "desc"
        },
        "measures": [
          "Olympics.avgAge"
        ],
        "filters": [],
        "segments": [
          "Olympics.wonMedal"
        ]
      }
    },
    genderByMedal: {
      xKey: ['Olympics.sex'],
      yKeys: ['Olympics.bronzeCount', 'Olympics.silverCount', 'Olympics.goldCount'],
      legendLabels: ['Bronze', 'Silver', 'Gold'],
      title: 'Medal Count by Gender',
      query: {
        "dimensions": [
          "Olympics.sex",
        ],
        "timeDimensions": [],
        "order": {
          "Olympics.count": "desc"
        },
        "measures": [
          "Olympics.bronzeCount",
          "Olympics.silverCount",
          "Olympics.goldCount"
        ],
        "filters": [
          {
            "member": "Olympics.count",
            "operator": "gt",
            "values": [
              "0"
            ]
          }
        ],
        "segments": [
          "Olympics.wonMedal"
        ]
      }
    },
    medalsByCity: {
      xKey: 'Olympics.city',
      yKeys: ['Olympics.bronzeCount', 'Olympics.silverCount', 'Olympics.goldCount'],
      legendLabels: ['Bronze', 'Silver', 'Gold'],
      title: 'Medal Count by City',
      query: {
        "dimensions": [
          "Olympics.city"
        ],
        "timeDimensions": [],
        "order": {
          "Olympics.bronzeCount": "desc"
        },
        "measures": [
          "Olympics.bronzeCount",
          "Olympics.silverCount",
          "Olympics.goldCount"
        ],
        "filters": [
          {
            "member": "Olympics.count",
            "operator": "gt",
            "values": [
              "0"
            ]
          }
        ],
        "segments": [
          "Olympics.wonMedal"
        ]
      }
    },
  };

  public yValues: any[];
  public xValues: any[];

  constructor(public cube: CubejsClient) { }

  ngOnInit(): void {
    this.cube.load(this.queries['medalsByCountry'].query as any).subscribe((result: any) => {
      this.setupData(result.loadResponse.results[0].data, 'medalsByCountry');
      this.loading = false;
    });
  }

  handleSelectionChange(event: any) {
    this.loading = true;
    this.cube.load(this.queries[event.target.value].query).subscribe((result: any) => {
      this.setupData(result.loadResponse.results[0].data, event.target.value);
      this.loading = false;
    });
  }

  setupData(data: any, queryKey: string) {
    this.currentQuery = this.queries[queryKey].query;
    this.xValues = data.map((point) => point[this.queries[queryKey].xKey]);

    this.yValues = [];

    for (const yKey of this.queries[queryKey].yKeys) {
      this.yValues.push({ data: data.map((point) => point[yKey]) });
    }

    if (this.queries[queryKey].legendLabels) {
      for (const [i, _] of this.yValues.entries()) {
        this.yValues[i].label = this.queries[queryKey].legendLabels[i];
      }
    }

    if (this.queries[queryKey].title) {
      this.titleSettings = {
        text: this.queries[queryKey].title,
        display: true
      }
    } else {
      this.titleSettings = {
        display: false
      }
    }
  }

  toggleCodeMode() {
    this.codeMode = !this.codeMode;
  }
}
