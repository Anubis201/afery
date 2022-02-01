import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollComponent implements AfterViewInit {
  @Input() poll: PollModel
  @Input() idSvg: string

  ngAfterViewInit() {
    this.draw(this.poll.parties);
  }

  private margin = 30;
  private width;
  private height = 300 - (this.margin * 2);

  readonly PartiesEnum = PartiesEnum

  private draw(data: PartyCharModel[]) {
    this.width = parseInt(d3.select('.poll').style('width'), 10);

    const xScale = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.party as unknown as string))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, 50])
      .range([this.height, 0]);

    const chartContainer = d3
      .select('#' + this.idSvg)
      .attr('width', this.width)
      .classed('chart-container', true)
      .attr('height', this.height + (this.margin * 2))

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
