import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const x = (d: Letter) => d.frequency;
const y = (d: Letter) => d.letter;
const xFormat = '%';
const xLabel = 'Frequency';
const color = '#4290f5';

const marginTop = 50;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;
const yPadding = 0.1;
const delay = 10;

export default function D3Test() {
  const { width, height, fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const svgRef = useRef<SVGSVGElement>(null);

  const animation = spring({
    fps,
    frame: frame - delay,
    config: {
      mass: 5,
      damping: 200,
    },
  })

  useEffect(() => {
    if (!svgRef.current) return;

    svgRef.current.innerHTML = ''
    const X = d3.map(data, x)
    const Y = d3.map(data, y)

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    const xRange = [marginLeft, width - marginRight]
    const yRange = [height - marginBottom, marginTop]

    const xDomain = [0, d3.max(X) as number]

    const I = d3.range(X.length).filter(i => yDomain.has(Y[i]))

    const xScale = d3.scaleLinear(xDomain, xRange)
    const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding)
    const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    // Compute titles.
    const formatValue = xScale.tickFormat(100, xFormat);
    const title = (i: number) => `${formatValue(X[i])}`;

    svg
      .append('g')
      .attr('transform', `translate(0,${marginTop})`)
      .call(xAxis)
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('y2', height - marginTop - marginBottom)
          .attr('stroke-opacity', 0.1)
      )
      .call((g) =>
        g
          .append('text')
          .attr('x', width - marginRight)
          .attr('y', -22)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .text(xLabel)
      );
    svg.append("g")
      .selectAll()
      .attr("fill", color)
      .data(I)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", i => yScale(Y[i]) as number)
      .attr('width', (i) => xScale(X[i]) * animation - xScale(0))
      .attr('height', yScale.bandwidth());

    svg
      .append('g')
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('text')
      .data(I)
      .join('text')
      .attr('x', (i) => xScale((X[i] * animation) as number))
      .attr('y', (i) => (yScale(Y[i]) as number) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('dx', -4)
      .text(title)
      .call((text) =>
        text
          .filter((i) => xScale(X[i]) - xScale(0) < 20) // Short bars
          .attr('dx', +4)
          .attr('fill', 'black')
          .attr('text-anchor', 'start')
      );

    svg.append('g').attr(`transform`, `translate(${marginLeft},0)`).call(yAxis);
    svg.node();
  }, [height, animation, width])

  return <svg id="hey" ref={svgRef} />

}

// Dataset
type Letter = {
  letter: string;
  frequency: number;
};

const data: Letter[] = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

const yDomain = new d3.InternSet(
  d3.groupSort(
    data,
    ([d]) => -d.frequency,
    (d) => d.letter
  )
);
