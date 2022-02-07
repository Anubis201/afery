import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-newests',
  templateUrl: './newests.component.html',
  styleUrls: ['./newests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewestsComponent {
  @Input() isAdmin: boolean
  @Input() set polls (polls: PollModel[]) {
    if (!polls.length) return

    this.rlyPoll.next(polls);
    this.create();
  }

  @Output() editPoll = new EventEmitter<string>()
  @Output() deletePoll = new EventEmitter<string>()

  rlyPoll = new BehaviorSubject<PollModel[]>([])
  isLoading = new BehaviorSubject<boolean>(true)

  private margin = 30;
  private width;
  private height = 300 - (this.margin * 2);

  private create() {
    this.rlyPoll.value.forEach((element, index) => {
      setTimeout(() => {
        this.draw(element.parties, index);
      });
    });
  }

  private draw(data: PartyCharModel[], index: number) {
    this.width = parseInt(d3.select('.poll').style('width'), 10);
    const isMobileVersion = this.width <= 330;

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
      .select(`#chart${index}`)
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
      .attr('xlink:href', party => `/assets/icons/parties/${PartiesEnum[party as PartiesEnum]}.png`)
      .attr('height', isMobileVersion ? 25 : 30)
      .attr('width', isMobileVersion ? 30 : 40)
      .attr('y', 10)
      .attr('x', isMobileVersion ? -14 : -20);

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
      .attr('text-anchor', 'middle');

      this.isLoading.next(false);
  }
}
