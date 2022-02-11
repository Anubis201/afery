import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PollModel } from 'src/app/models/polls/poll.model';
import * as d3 from 'd3';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

@Component({
  selector: 'app-poll-pc',
  templateUrl: './poll-pc.component.html',
  styleUrls: ['./poll-pc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollPcComponent {
  @Input() poll: PollModel
  @Input() idSvg: string

  @ViewChild('image') image: ElementRef;

  private margin = 30;
  private height = 200 - (this.margin * 2);

  ngAfterViewInit() {
    this.draw(this.poll.parties);
  }

  private draw(data: PartyCharModel[]) {
    const width = parseInt(this.image.nativeElement.offsetWidth, 10);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.party as unknown as string))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, 50])
      .range([this.height, 0]);

    const chartContainer = d3
      .select('#' + this.idSvg)
      .attr('width', width)
      .classed('chart-container', true)
      .attr('height', this.height + (this.margin * 2))

    const chart = chartContainer.append('g');

    chart
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('.tick')
      .append('svg:image')
      .attr('xlink:href', party => `/assets/icons/parties/${PartiesEnum[party as PartiesEnum]}.png`)
      .attr('height', 25)
      .attr('width', 30)
      .attr('y', 10)
      .attr('x', -14);

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
      .attr('font-weight', 500)
      .attr('font-size', '13px')
      .attr('text-anchor', 'middle');
  }
}
