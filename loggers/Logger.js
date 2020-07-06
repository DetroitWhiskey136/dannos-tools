const fs = require('fs');
class Logger {
  static timestamp() {
    const date = new Date;
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const formatedDate = `${m[date.getMonth()]}-${date.getDate()}-${date.getFullYear()}`

    return [
      `\x1b[96m${formatedDate}|${formatedTime}\x1b[0m`,
      `${formatedDate}`,
      `${formatedDate}|${formatedTime}`
    ]
  }

  static appendLogs(timestamp, ...content) {
    const filePath = './data/logs/'
    const file = `${filePath}${timestamp[1]}.log`; 
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, {recursive: true})
    fs.appendFileSync(file, `${content}\n`)
  }

  static type(type) {
    const types = {
      LOG: [
        '\x1b[92mLOG\x1b[0m',
        'LOG'
      ],
      DEBUG: [
        '\x1b[94mDEBUG\x1b[0m',
        'DEBUG'
      ],
      WARN: [
        '\x1b[33mWARN\x1b[0m',
        'WARN'
      ],
      ERROR: [
        '\x1b[91mERROR\x1b[0m',
        'ERROR'
      ]
    }

    return types[type];
  }

  static log(...content) {
    const tm = this.timestamp()
    console.log(this.type('LOG')[0], tm[0], ...content)
    this.appendLogs(tm, `${this.type('LOG')[1]} ${tm[2]} ${content.join(' ')}`)
  }

  static debug(...content) {
    const tm = this.timestamp()
    console.log(this.type('DEBUG')[0], tm[0], ...content)
    this.appendLogs(tm, `${this.type('DEBUG')[1]} ${tm[2]} ${content.join(' ')}`)
  }

  static warn(...content) {
    const tm = this.timestamp()
    console.log(this.type('WARN')[0], tm[0], ...content)
    this.appendLogs(tm, `${this.type('WARN')[1]} ${tm[2]} ${content.join(' ')}`)
  }

  static error(...content) {
    const tm = this.timestamp()
    console.log(this.type('ERROR')[0], tm[0], ...content)
    this.appendLogs(tm, `${this.type('ERROR')[1]} ${tm[2]} ${content.join(' ')}`)
  }

}
module.exports = Logger;
