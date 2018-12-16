const data = [ { count: 30, year: 2008 },
  { count: 73, year: 2009 },
  { count: 171, year: 2010 },
  { count: 305, year: 2011 },
  { count: 434, year: 2012 },
  { count: 610, year: 2013 },
  { count: 835, year: 2014 },
  { count: 921, year: 2015 },
  { count: 913, year: 2016 },
  { count: 612, year: 2017 } ]

const labels = data.map(i => i.label)
const series = data.map(i => i.count)

export default {
  labels,
  series
}
