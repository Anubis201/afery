import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { OtherPollModel } from 'src/app/models/polls/other-poll.model';
import { PollModel } from 'src/app/models/polls/poll.model';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherComponent implements AfterViewInit {
  @Input() poll: PollModel
  @Input() idSvg: string

  @ViewChild('duma') image: ElementRef

  ngAfterViewInit() {
    this.draw(this.poll.items as OtherPollModel[]);
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  handleEditPoll() {
    this.router.navigate(
      ['/admin/polls'],
      { queryParams: { id: this.poll.id } }
    )
  }

  get isAdmin() {
    return this.userService.isAdmin
  }

  private draw(data: OtherPollModel[]) {
    const width = parseInt(this.image.nativeElement.offsetWidth, 10);
    const yLabelSpace = 7;
    const thisIsBig = width >= 552;
    const margin = 30;
    const height = 280 - (margin * 2);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.text))
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
      .selectAll('text')
      .style('opacity', 0)
      .attr('y', 15)
      // .attr('x', (thisIsBig ? -20 : -14))
      .transition()
      .ease(d3.easeLinear)
      .duration(1500)
      .style('opacity', 1);

    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true )
      .attr('x', d => xScale(d.text as unknown as string) + (thisIsBig ? 20 : 5))
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
      .attr('x', d => (xScale(d.text as unknown as string) + xScale.bandwidth() / 2))
      .attr('y', d => yScale(d.percentage) - yLabelSpace)
      .attr('fill', 'white')
      .attr('font-weight', 500)
      .attr('font-size', (thisIsBig ? '14px' : '11px'))
      .attr('text-anchor', 'middle');
  }

}
