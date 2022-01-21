import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
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
      this.draw(polls[0].parties);
    }
  }

  private margin = 50;
  private width = 550 - (this.margin * 2);
  private height = 300 - (this.margin * 2);

  private draw(data: PartyCharModel[]): void {
    const xScale = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.party as unknown as string))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, 60])
      .range([this.height, 0]);

    const chartContainer = d3
      .select('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    const chart = chartContainer.append('g');

    chart
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('.tick')
      .append('svg:image')
      .attr('xlink:href', party => `/assets/icons/parties/${PartiesEnum[party as PartiesEnum]}.jpg`)
      .attr('width', 30)
      .attr('height', 30)
      .attr('y', 10)
      .attr('x', -15);

    chart
      .select('g')
      .selectAll('text')
      .remove();

    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true )
      .attr('x', d => xScale(d.party as unknown as string))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth())
      .attr('height', d => this.height - yScale(d.percentage))
      .attr('fill', '#db00db');

    chart
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.percentage as unknown as string + '%')
      .attr('x', d => xScale(d.party as unknown as string) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.percentage) - 15)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle');
  }
}
