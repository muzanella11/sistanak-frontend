import { take, reject } from 'lodash'

export default function (value, count = 10, glue = ' ') {
  // Count total words
  let __words = reject(value.split(' '), w => (w) ? !w.trim().length : '') // words
  let __wordsTotal = __words.length // Count total words
  let __maxWordsTotal = count // maximal words total
  let __maxCharWords = 11 // maximal character per words
  let prepend = ''
  let takeWord = ''

  if (__wordsTotal > 1) {
    // if total words > 1
    // For ellipsis per kata
    prepend = __words.length > __maxWordsTotal ? ' ...' : ''
    takeWord = take(__words, __maxWordsTotal).join(glue) + prepend
  } else {
    // else
    __words = __words[0]
    prepend = __words.length > __maxCharWords ? ' ...' : ''
    takeWord = take(__words, __maxCharWords).join('') + prepend
  }

  return takeWord
}
