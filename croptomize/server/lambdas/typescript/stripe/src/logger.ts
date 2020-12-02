export const logger = (data: any = {}, title = '', isError = false) => {
  console.log(FgCyan, separator, back)
  if (title) {
    console.log(isError ? FgRed : FgYellow, title, back)
  }
  console.dir(data, { depth: null, colors: true })
}

// Fancy colors for logging
// NOT important
const separator = Array(40).join('-')
const FgCyan = '\x1b[36m'
const FgYellow = '\x1b[33m'
const FgRed = '\x1b[31m'
const back = '\x1b[0m'
