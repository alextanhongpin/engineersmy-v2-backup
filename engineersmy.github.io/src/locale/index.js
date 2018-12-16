import messages from './resources'
import Formatter from './formatter'

const formatter = new Formatter()

export const Languages = [
  {
    id: 'en-us',
    label: 'English'
  },
  {
    id: 'my-ms',
    label: 'Malay'
  },
  {
    id: 'zh-cn',
    label: 'Chinese Traditional'
  },
  {
    id: 'de',
    label: 'German'
  }
]
export default {
  locale: 'en-us',
  messages,
  formatter
}
