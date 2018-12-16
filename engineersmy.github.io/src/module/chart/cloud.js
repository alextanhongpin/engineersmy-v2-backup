import * as d3 from 'd3'
import cloud from './d3.layout.cloud.js'

const frequencyList = [
  { text: 'app', size: 145 },
  { text: 'project', size: 138 },
  { text: 'data', size: 132 },
  { text: 'web', size: 129 },
  { text: 'code', size: 121 },
  { text: 'repository', size: 117 },
  { text: 'android', size: 110 },
  { text: 'api', size: 108 },
  { text: 'repo', size: 94 },
  { text: 'rails', size: 87 },
  { text: 'simple', size: 86 },
  { text: 'library', size: 81 },
  { text: 'application', size: 75 },
  { text: 'website', size: 73 },
  { text: 'learning', size: 73 },
  { text: 'source', size: 73 },
  { text: 'react', size: 69 },
  { text: 'programming', size: 66 },
  { text: 'system', size: 62 },
  { text: 'server', size: 61 },
  { text: 'open', size: 60 },
  { text: 'python', size: 58 },
  { text: 'github', size: 55 },
  { text: 'list', size: 54 },
  { text: 'framework', size: 53 },
  { text: 'test', size: 49 },
  { text: 'git', size: 49 },
  { text: 'ruby', size: 48 },
  { text: 'file', size: 48 },
  { text: 'user', size: 48 },
  { text: 'assignment', size: 48 },
  { text: 'native', size: 48 },
  { text: 'guide', size: 45 },
  { text: 'day', size: 45 },
  { text: 'sinatra', size: 44 },
  { text: 'php', size: 44 },
  { text: 'based', size: 42 },
  { text: 'coursera', size: 41 },
  { text: 'game', size: 41 },
  { text: 'week', size: 41 },
  { text: 'https', size: 39 },
  { text: 'javascript', size: 38 },
  { text: 'group', size: 38 },
  { text: 'ios', size: 36 },
  { text: 'bitcoin', size: 36 },
  { text: 'development', size: 36 },
  { text: 'skeleton', size: 35 },
  { text: 'tutorial', size: 35 },
  { text: 'plugin', size: 35 },
  { text: 'testing', size: 35 },
  { text: 'apps', size: 35 },
  { text: 'written', size: 34 },
  { text: 'node', size: 33 },
  { text: 'science', size: 33 },
  { text: 'sharing', size: 32 },
  { text: 'projects', size: 32 },
  { text: 'laravel', size: 32 },
  { text: 'windows', size: 30 },
  { text: 'google', size: 30 },
  { text: 'sample', size: 29 },
  { text: 'http', size: 29 },
  { text: 'version', size: 29 },
  { text: 'management', size: 29 },
  { text: 'platform', size: 29 },
  { text: 'service', size: 28 },
  { text: 'client', size: 28 },
  { text: 'create', size: 28 },
  { text: 'bootstrap', size: 27 },
  { text: 'build', size: 27 },
  { text: 'support', size: 27 },
  { text: 'core', size: 26 },
  { text: 'java', size: 26 },
  { text: 'deep', size: 26 },
  { text: 'angular', size: 25 },
  { text: 'image', size: 24 },
  { text: 'building', size: 24 },
  { text: 'leek', size: 24 },
  { text: 'analysis', size: 23 },
  { text: 'implementation', size: 23 },
  { text: 'wallet', size: 23 },
  { text: 'built', size: 23 },
  { text: 'interface', size: 23 },
  { text: 'demo', size: 23 },
  { text: 'collection', size: 22 },
  { text: 'final', size: 22 },
  { text: 'structure', size: 22 },
  { text: 'basic', size: 22 },
  { text: 'module', size: 22 },
  { text: 'mobile', size: 22 },
  { text: 'language', size: 22 },
  { text: 'blog', size: 21 },
  { text: 'free', size: 21 },
  { text: 'database', size: 21 },
  { text: 'tool', size: 21 },
  { text: 'time', size: 21 },
  { text: 'tensorflow', size: 21 },
  { text: 'html', size: 21 },
  { text: 'admin', size: 20 },
  { text: 'complete', size: 20 },
  { text: 'program', size: 20 }
]

export default function init (id) {
  const extent = d3.extent(frequencyList.map(d => d.size))
  const min = extent[0]
  const max = extent[1]
  const color = d3.scaleLinear()
    .domain([min, (min + max) / 2, max / 2, max])
    .interpolate(d3.interpolateRgb)
    .range([
      '#0544d3',
      '#453d3f',
      '#d70206'
    ])

  const svg = d3.select(id).append('svg')
    .attr('width', 960)
    .attr('height', 640)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', '0 0 960 960')
    .style('width', '100%')
    .style('height', '100%')
    .attr('class', 'wordcloud')

  // without the transform, words words would get cutoff to the left and top, they would
  // appear outside of the SVG area
  const g = svg.append('g')
        .attr('transform', 'translate(360,480)')

  cloud()
    .size([960, 640])
    .words(frequencyList)
    .rotate(0)
    .fontSize(d => d.size)
    .on('end', draw)
    .start()

  function draw (words) {
    g.selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', (d) => `${d.size}px`)
      .style('opacity', (d) => d.size / max > 0.8 ? 0.8 : d.size / max)
      .style('fill', (d, i) => color(i))
      .attr('transform', function (d) {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
      })
      .text(d => d.text)
  }
}
