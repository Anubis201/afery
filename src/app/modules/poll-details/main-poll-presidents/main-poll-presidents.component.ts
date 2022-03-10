import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PresidentPollModel } from 'src/app/models/polls/president-poll.mode';

@Component({
  selector: 'app-main-poll-presidents',
  templateUrl: './main-poll-presidents.component.html',
  styleUrls: ['./main-poll-presidents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPollPresidentsComponent implements AfterViewInit {
  @Input() poll: PollModel

  ngAfterViewInit() {
    this.draw(this.poll?.items as PresidentPollModel[]);
  }

  @ViewChild('main') image: ElementRef;

  private margin = 30
  private height = 400 - (this.margin * 2)

  private draw(data: PresidentPollModel[]) {
    const width = parseInt(this.image.nativeElement.offsetWidth, 10);
    const yLabelSpace = 7;
    const isMobile = width <= 700;

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.president as unknown as string))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, 50])
      .range([this.height, 0]);

    const chartContainer = d3
      .select('#mainPoll')
      .attr('width', width + 10)
      .classed('chart-container', true)
      .attr('height', this.height + (this.margin * 2))

    const chart = chartContainer.append('g');

    chart
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('.tick')
      .append('svg:image')
      .style('opacity', 0)
      .attr('xlink:href', president => `/assets/icons/presidents/${president}.jpg`)
      .attr('height', (isMobile ? 25 : 35))
      .attr('width', (isMobile ? 30 : 45))
      .attr('y', 20)
      .attr('x', (isMobile ? -14 : -24))
      .transition()
      .ease(d3.easeLinear)
      .duration(1000)
      .style('opacity', 1);

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
      .attr('x', d => xScale(d.president as unknown as string) + (isMobile ? 5 : 23))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth() - (isMobile ? 13 : 45))
      .transition()
      .ease(d3.easeBounce)
      .duration(1000)
      .attr('height', d => this.height - yScale(d.percentage))
      .attr('fill', 'red');

    chart
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.percentage + '%')
      .attr('x', d => (xScale(d.president as unknown as string) + xScale.bandwidth() / 2))
      .attr('y', d => yScale(d.percentage) - yLabelSpace)
      .attr('fill', 'white')
      .attr('font-weight', 500)
      .attr('font-size', isMobile ? '11px' : '16px')
      .attr('text-anchor', 'middle');
  }
}
