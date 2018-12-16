// RESOURCE FILEs
// * List of all the resource files
import en from './resources/en-us.js'
import my from './resources/my-ms.js'
import de from './resources/de.js'
import ch from './resources/zh-cn.js'

const resources = {
  'en-us': {
    message: Object.assign({}, en),
    formatter: {
      moment: 'moment'
    }
  },
  'my-ms': {
    message: Object.assign({}, my),
    formatter: {
      moment: 'moment'
    }
  },
  'de': {
    message: Object.assign({}, de),
    formatter: {
      moment: 'moment'
    }
  },
  'zh-cn': {
    message: Object.assign({}, ch),
    formatter: {
      moment: 'moment'
    }
  }
  // 'zh_TW': { message: Object.assign({}, datetimeLocale) }
}

export default resources
