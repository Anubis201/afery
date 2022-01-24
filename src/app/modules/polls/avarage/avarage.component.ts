import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/polls/poll.model';
import * as d3 from 'd3';

interface CharDataModel {
  party: PartiesEnum,
  percentage: number,
  time: Date,
}

@Component({
  selector: 'app-avarage',
  templateUrl: './avarage.component.html',
  styleUrls: ['./avarage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvarageComponent {
  @Input() set polls(polls: PollModel[]) {
    if (!polls.length) return

    this.prepareData(polls);
    this.convertDataToChart();
    // this.drawSvg();
  }

  private charData: CharDataModel[] = []
  private data: { time: Date, parties: PartyCharModel[] }[] = []

  // private drawSvg() {
  //   const svg = d3.select('#avarage');

  //   const width = +svg.attr('width');
  //   const height = +svg.attr('height');

  //   const render = data => {
  //     const title = 'A Week of Temperature Around the World';

  //     const xValue = d => d.timestamp;
  //     const xAxisLabel = 'Time';

  //     const yValue = d => d.temperature;
  //     const circleRadius = 6;
  //     const yAxisLabel = 'Temperature';

  //     const colorValue = d => d.city;

  //     const margin = { top: 60, right: 160, bottom: 88, left: 105 };
  //     const innerWidth = width - margin.left - margin.right;
  //     const innerHeight = height - margin.top - margin.bottom;

  //     const xScale = d3.scaleTime()
  //       .domain(d3.extent(data, xValue))
  //       .range([0, innerWidth])
  //       .nice();

  //     const yScale = d3.scaleLinear()
  //       .domain(d3.extent(data, yValue))
  //       .range([innerHeight, 0])
  //       .nice();

  //     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  //     const g = svg.append('g')
  //       .attr('transform', `translate(${margin.left},${margin.top})`);

  //     const xAxis = d3.axisBottom(xScale)
  //       .tickSize(-innerHeight)
  //       .tickPadding(15);

  //     const yAxis = d3.axisLeft(yScale)
  //       .tickSize(-innerWidth)
  //       .tickPadding(10);

  //     const yAxisG = g.append('g').call(yAxis);
  //     yAxisG.selectAll('.domain').remove();

  //     yAxisG.append('text')
  //       .attr('class', 'axis-label')
  //       .attr('y', -60)
  //       .attr('x', -innerHeight / 2)
  //       .attr('fill', 'black')
  //       .attr('transform', `rotate(-90)`)
  //       .attr('text-anchor', 'middle')
  //       .text(yAxisLabel);

  //     const xAxisG = g.append('g').call(xAxis)
  //       .attr('transform', `translate(0,${innerHeight})`);

  //     xAxisG.select('.domain').remove();

  //     xAxisG.append('text')
  //       .attr('class', 'axis-label')
  //       .attr('y', 80)
  //       .attr('x', innerWidth / 2)
  //       .attr('fill', 'black')
  //       .text(xAxisLabel);

  //     const lineGenerator = d3.line()
  //       .x(d => xScale(xValue(d)))
  //       .y(d => yScale(yValue(d)))
  //       .curve(d3.curveBasis);

  //     const lastYValue = d =>
  //       yValue(d.values[d.values.length - 1]);

  //     const nested = d3.group()
  //       .key(colorValue)
  //       .entries(data)
  //       .sort((a, b) =>
  //       d3.descending(lastYValue(a), lastYValue(b))
  //       );

  //     console.log(nested);

  //     colorScale.domain(nested.map(d => d.key));

  //     g.selectAll('.line-path').data(nested)
  //       .enter().append('path')
  //       .attr('class', 'line-path')
  //       .attr('d', d => lineGenerator(d.values))
  //       .attr('stroke', d => colorScale(d.key));

  //     g.append('text')
  //       .attr('class', 'title')
  //       .attr('y', -10)
  //       .text(title);

  //     svg.append('g')
  //       .attr('transform', `translate(790,121)`)
  //       .call(colorLegend, {
  //         colorScale,
  //         circleRadius: 13,
  //         spacing: 30,
  //         textOffset: 15
  //       });
  //   };
  // }

  private convertDataToChart() {
    this.data.forEach(toConvert => {
      const helpVariable = [];
      helpVariable.push(toConvert.parties.map(e => ({
        ...e,
        time: toConvert.time,
      })))
      this.charData = [...this.charData, ...helpVariable[0]]
    })
  }

  private setDefualtParties(poll: PollModel) {
    return poll.parties.map(ele => ({ ...ele, percentage: 0 }))
  }

  private getValue(monthAvarage: PartyCharModel[], countItem: number) {
    return monthAvarage.map(e => ({ ...e, percentage: e.percentage as number / countItem }))
  }

  private addTick(time: Date, monthAvarage: PartyCharModel[], countItem: number) {
    this.data.push({
      time,
      parties: this.getValue(monthAvarage, countItem),
    });
  }

  private prepareData(polls: PollModel[]) {
    let time: Date = polls[0].when;
    let monthAvarage: PartyCharModel[] = this.setDefualtParties(polls[0]);
    let countItem = 0;

    polls.forEach((element, index) => {
      element.when.setDate(1);
      const isLast = index === polls.length - 1;

      if (element.when.getTime() !== time?.getTime()) {
        this.addTick(time, monthAvarage, countItem);
        time = element.when;
        monthAvarage = this.setDefualtParties(polls[0]);
        countItem = 0;
      }

      countItem++;
      monthAvarage = element.parties.map(el => ({
        ...el,
        percentage: (monthAvarage.find(f => f.party === el.party)?.percentage as number) + (el.percentage as number),
      }));

      if (!isLast) return

      if (this.data[this.data.length - 1].time.getTime() !== element.when.getTime())
        this.addTick(time, monthAvarage, countItem);
      else
        this.data[this.data.length - 1].parties = monthAvarage;
    })
  }
}
