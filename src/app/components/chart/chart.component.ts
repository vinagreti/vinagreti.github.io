import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import * as PlotlyJS from "plotly.js-dist-min";
import { PlotlyModule } from "angular-plotly.js";

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
    selector: "app-chart",
    imports: [PlotlyModule],
    templateUrl: "./chart.component.html",
    styleUrl: "./chart.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  data = input.required<Partial<Plotly.PlotData>[]>();

  title = input<string>();

  graph = computed(() => {
    const data = this.data();
    const title = this.title();
    return {
      layout: { autosize: true, title },
      data,
    };
  });
}
