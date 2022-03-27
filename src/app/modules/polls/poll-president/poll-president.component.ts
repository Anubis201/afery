import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PresidentPollModel } from 'src/app/models/polls/president-poll.mode';
import * as d3 from 'd3';
import { PollModel } from 'src/app/models/polls/poll.model';
import { DatePipe } from '@angular/common';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';

@Component({
  selector: 'app-poll-president',
  templateUrl: './poll-president.component.html',
  styleUrls: ['./poll-president.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollPresidentComponent implements AfterViewInit {
  @Input() poll: PollModel
  @Input() idSvg: string

  @ViewChild('ameno') image: ElementRef

  constructor(private datePipe: DatePipe) {}

  ngAfterViewInit() {
    this.draw(this.poll.items as PresidentPollModel[]);
  }

  get toPage() {
    const date = this.datePipe.transform(this.poll.when,'yyyy-MM-dd');
    return `/sondaz/${this.poll.id}/${ChangePolishChars(`${this.poll.surveying}-${date}`)}`
  }

  private draw(data: PresidentPollModel[]) {
    const width = parseInt(this.image.nativeElement.offsetWidth, 10);
    const yLabelSpace = 7;
    const thisIsBig = width >= 552;
    const margin = 30;
    const height = 280 - (margin * 2);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.president as unknown as string))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, 50])
      .range([height, 0]);

    const chartContainer = d3
      .select('#' + this.idSvg)
      .attr('width', width + 10)
      .classed('chart-container', true)
      .attr('height', height + (margin * 2))

    const chart = chartContainer.append('g');

    chart
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('.tick')
      .append('svg:image')
      .style('opacity', 0)
      .attr('xlink:href', (party) => `/assets/icons/presidents/${party}.jpg`)
      .attr('height', (thisIsBig ? 37 : 25))
      .attr('width', (thisIsBig ? 40 : 30))
      .attr('y', 15)
      .attr('x', (thisIsBig ? -20 : -14))
      .transition()
      .ease(d3.easeLinear)
      .duration(1500)
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
      .attr('x', d => xScale(d.president as unknown as string) + (thisIsBig ? 20 : 5))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth() - (thisIsBig ? 45 : 13))
      .transition()
      .ease(d3.easeBounce)
      .duration(1500)
      .attr('height', d => height - yScale(d.percentage))
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
      .attr('font-size', (thisIsBig ? '14px' : '11px'))
      .attr('text-anchor', 'middle');
  }
}
