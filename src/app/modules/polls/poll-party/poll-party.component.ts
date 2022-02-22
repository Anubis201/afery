import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PollModel } from 'src/app/models/polls/poll.model';
import * as d3 from 'd3';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';
import { DatePipe } from '@angular/common';
import { PartiesColorsEnum } from 'src/app/models/polls/enums/parties-colors.enum';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-poll-party',
  templateUrl: './poll-party.component.html',
  styleUrls: ['./poll-party.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollPartyComponent {
  @Input() poll: PollModel
  @Input() idSvg: string

  @ViewChild('image') image: ElementRef

  isLoading = new BehaviorSubject<boolean>(true)

  private margin = 30
  private height = 280 - (this.margin * 2)

  get toPage() {
    const date = this.datePipe.transform(this.poll.when,'yyyy-MM-dd');
    return `/sondaz/${this.poll.id}/${ChangePolishChars(`${this.poll.surveying}-${date}`)}`
  }

  constructor(
    private datePipe: DatePipe,
    private pollsService: PollsService,
  ) {}

  ngAfterViewInit() {
    this.previousPoll();
  }

  private previousPoll() {
    this.pollsService.getPreviousPoll(this.poll.surveying, this.poll.when).subscribe({
      next: data => this.draw(this.poll?.items as PartyCharModel[], data?.items as PartyCharModel[]),
      complete: () => this.isLoading.next(false)
    })
  }

  private draw(data: PartyCharModel[], previousElection: PartyCharModel[]) {
    const width = parseInt(this.image.nativeElement.offsetWidth, 10);
    const yLabelSpace = 7;
    const thisIsBig = width >= 552;

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
      .attr('xlink:href', party => `/assets/icons/parties/${PartiesEnum[party as PartiesEnum]}.png`)
      .attr('height', (thisIsBig ? 30 : 25))
      .attr('width', (thisIsBig ? 35 : 30))
      .attr('y', 15)
      .attr('x', (thisIsBig ? -17 : -14));

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
      .attr('x', d => xScale(d.party as unknown as string) + (thisIsBig ? 20 : 5))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth() - (thisIsBig ? 40 : 13))
      .attr('height', d => this.height - yScale(d.percentage))
      .attr('fill', d => PartiesColorsEnum[PartiesEnum[d.party]]);

    chart
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.percentage + '%')
      .attr('x', d => (xScale(d.party as unknown as string) + xScale.bandwidth() / 2))
      .attr('y', d => yScale(d.percentage) - yLabelSpace)
      .attr('fill', 'white')
      .attr('font-weight', 500)
      .attr('font-size', (thisIsBig ? '13px' : '11px'))
      .attr('text-anchor', 'middle');

    if (!previousElection) return

    chart
      .selectAll('.amen')
      .data(previousElection)
      .enter()
      .append('rect')
      .classed('amen', true )
      .attr('x', d => xScale(d.party as unknown as string) + (thisIsBig ? 70 : 27))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth() - (thisIsBig ? 68 : 23))
      .attr('height', d => this.height - yScale(d.percentage))
      .attr('opacity', 0.3)
      .attr('fill', d => PartiesColorsEnum[PartiesEnum[d.party]]);

    chart
      .selectAll('.label')
      .data(previousElection)
      .enter()
      .append('text')
      .text(d => d.percentage === 0 ? '' : d.percentage + '%')
      .attr('x', d => (xScale(d.party as unknown as string) + xScale.bandwidth() / 2) + (thisIsBig ? 58 : 29))
      .attr('y', d => yScale(d.percentage) - yLabelSpace)
      .attr('fill', 'white')
      .attr('font-weight', 500)
      .attr('font-size', (thisIsBig ? '10px' : '8px'))
      .attr('opacity', 0.4)
      .attr('text-anchor', 'middle');
  }
}
