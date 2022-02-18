import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PartiesColorsEnum } from 'src/app/models/polls/enums/parties-colors.enum';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-main-poll',
  templateUrl: './main-poll.component.html',
  styleUrls: ['./main-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPollComponent implements AfterViewInit {
  @Input() poll: PollModel
  @Input() set compareData(data: PartyCharModel[]) {
    if (this.image) {
      this.removeContent();
      this.draw(this.poll?.items, data);
    }

    this.compare = data;
  }

  compare: PartyCharModel[]

  ngAfterViewInit() {
    this.draw(this.poll?.items, this.compare);
  }

  @ViewChild('main') image: ElementRef;

  private margin = 30;
  private height = 400 - (this.margin * 2);

  private removeContent() {
    d3
      .select('#mainPoll g')
      .remove();
  }

  private draw(data: PartyCharModel[], compare: PartyCharModel[]) {
    const width = parseInt(this.image.nativeElement.offsetWidth, 10);
    const yLabelSpace = 7;
    const isMobile = width <= 700;

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
      .attr('xlink:href', party => `/assets/icons/parties/${PartiesEnum[party as PartiesEnum]}.png`)
      .attr('height', (isMobile ? 25 : 35))
      .attr('width', (isMobile ? 30 : 45))
      .attr('y', 20)
      .attr('x', (isMobile ? -14 : -24));

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
      .attr('x', d => xScale(d.party as unknown as string) + (isMobile ? 5 : 23))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth() - (isMobile ? 13 : 45))
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
      .attr('font-size', isMobile ? '11px' : '16px')
      .attr('text-anchor', 'middle');

    if (!compare) return

    chart
      .selectAll('.amen')
      .data(compare)
      .enter()
      .append('rect')
      .classed('amen', true )
      .attr('x', d => xScale(d.party as unknown as string) + (isMobile ? 27 : 85))
      .attr('y', d => yScale(d.percentage))
      .attr('width', xScale.bandwidth() - (isMobile ? 23 : 80))
      .attr('height', d => this.height - yScale(d.percentage))
      .attr('opacity', 0.3)
      .attr('fill', d => PartiesColorsEnum[PartiesEnum[d.party]]);

    chart
      .selectAll('.label')
      .data(compare)
      .enter()
      .append('text')
      .text(d => d.percentage === 0 ? '' : d.percentage + '%')
      .attr('x', d => (xScale(d.party as unknown as string) + xScale.bandwidth() / 2) + (isMobile ? 29 : 66))
      .attr('y', d => yScale(d.percentage) - yLabelSpace)
      .attr('fill', 'white')
      .attr('font-weight', 500)
      .attr('font-size', isMobile ? '8px' : '12px')
      .attr('opacity', 0.4)
      .attr('text-anchor', 'middle');
  }
}
