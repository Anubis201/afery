import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/articles/poll.model';

@Component({
  selector: 'app-newests',
  templateUrl: './newests.component.html',
  styleUrls: ['./newests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewestsComponent {
  @Input() set polls (polls: PollModel[]) {
    if (polls.length) {
      this.createSvg();
      this.drawBars(polls[0].parties);
    }
  }

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select('figure#bar')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: PartyCharModel[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.party as unknown as string))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', 'white')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('fill', 'white');

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.party))
      .attr('y', d => y(d.percentage))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.percentage))
      .attr('fill', '#db00db')
  }
}
