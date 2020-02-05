const logger = require('./loggers/Logger');

logger.log('script started', 'this is part two');

logger.warn('Script is ending')

logger.debug('script ended')


try {
  throw new Error('this is a error')
} catch (error) {
  console.log(error.stack.split('\n'))
  let errorMessage = error.stack && error.stack.split('\n')[1];
  const regex = new RegExp(/([\d,\-\w]:[\\\d,\-\w]+\.[A-Za-z]{1,3}):(\d+):(\d+)/i);
  const info = regex.test(errorMessage) && errorMessage.match(regex);
  console.log(info)
  logger.error(error.message, `${info[1]}|${info[2]}:${info[3]}`)
}

/* const fs = require('fs')

process.on('exit', () => {
  const filePath = `./data/logs/`
  const files = fs.readdirSync(filePath)
  console.log(files)
  fs.unlinkSync(`${filePath}${files[0]}`)
}) */