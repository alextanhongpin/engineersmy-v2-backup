import moment from 'moment'
export default class Formatter {
  format (message, ...args) {
    // Problem...it will match the message currency and number
    // without regarding the namespace
    const params = args[0]
    switch (message) {
      case 'moment': {
        const { value, format } = params
        if (format === 'relative') {
          return moment(value).calendar()
        }
        return moment(value).format(format)
      }
    }
  }
}
