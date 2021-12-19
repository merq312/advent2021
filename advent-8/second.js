data = require('fs')
  .readFileSync('data', { encoding: 'utf-8', flag: 'r' })
  .trim()
  .split('\r\n')
  .map((line) => line.split(' | '))
  .map((line) =>
    line.map((segment) =>
      segment.split(' ').map((chars) => chars.split('').sort().join(''))
    )
  )

key = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
}

sum = 0
for (line of data) {
  ;[signal, codes] = [line[0], line[1]]

  charKey = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }

  signalKey = {
    T: '',
    L1: '',
    R1: '',
    M: '',
    L2: '',
    R2: '',
    B: '',
  }

  diff = (str1, str2) => {
    for (char of str2.split('')) {
      str1 = str1.replace(char, '')
    }
    return str1
  }

  combine = (str1, str2) => {
    for (char of diff(str2, str1).split('')) {
      str1 = (str1 + char).split('').sort().join('')
    }
    return str1
  }

  for (ea of signal) {
    if (ea.length in key) {
      charKey[key[ea.length]].push(ea)
    } else if (ea.length === 5) {
      charKey[2].push(ea)
      charKey[3].push(ea)
      charKey[5].push(ea)
    } else if (ea.length === 6) {
      charKey[0].push(ea)
      charKey[6].push(ea)
      charKey[9].push(ea)
    }
  }

  signalKey['T'] = diff(charKey[7][0], charKey[1][0])
  signalKey['L2'] = diff(
    diff(
      combine(
        combine(
          diff(charKey[8][0], charKey[2][0]),
          diff(charKey[8][0], charKey[2][1])
        ),
        diff(charKey[8][0], charKey[2][2])
      ),
      charKey[1][0]
    ),
    charKey[4][0]
  )
  signalKey['L1'] = diff(
    diff(
      combine(
        combine(
          diff(charKey[8][0], charKey[2][0]),
          diff(charKey[8][0], charKey[2][1])
        ),
        diff(charKey[8][0], charKey[2][2])
      ),
      charKey[1][0]
    ),
    signalKey['L2']
  )
  signalKey['M'] = diff(
    combine(
      combine(
        diff(charKey[8][0], charKey[0][0]),
        diff(charKey[8][0], charKey[0][1])
      ),
      diff(charKey[8][0], charKey[0][2])
    ),
    combine(
      combine(
        diff(charKey[8][0], charKey[2][0]),
        diff(charKey[8][0], charKey[2][1])
      ),
      diff(charKey[8][0], charKey[2][2])
    )
  )
  signalKey['R1'] = diff(
    combine(
      combine(
        diff(charKey[8][0], charKey[0][0]),
        diff(charKey[8][0], charKey[0][1])
      ),
      diff(charKey[8][0], charKey[0][2])
    ),
    combine(signalKey['M'], signalKey['L2'])
  )
  signalKey['R2'] = diff(charKey[1][0], signalKey['R1'])
  temp = charKey[8][0]
  Object.values(signalKey).forEach((ea) => (temp = diff(temp, ea)))
  signalKey['B'] = temp

  charKey = {
    0:
      signalKey['T'] +
      signalKey['L1'] +
      signalKey['L2'] +
      signalKey['R1'] +
      signalKey['R2'] +
      signalKey['B'],
    1: charKey[1][0],
    2:
      signalKey['T'] +
      signalKey['R1'] +
      signalKey['M'] +
      signalKey['L2'] +
      signalKey['B'],
    3:
      signalKey['T'] +
      signalKey['R1'] +
      signalKey['M'] +
      signalKey['R2'] +
      signalKey['B'],
    4: charKey[4][0],
    5:
      signalKey['T'] +
      signalKey['L1'] +
      signalKey['M'] +
      signalKey['R2'] +
      signalKey['B'],
    6:
      signalKey['T'] +
      signalKey['L1'] +
      signalKey['L2'] +
      signalKey['M'] +
      signalKey['R2'] +
      signalKey['B'],
    7: charKey[7][0],
    8: charKey[8][0],
    9:
      signalKey['T'] +
      signalKey['L1'] +
      signalKey['M'] +
      signalKey['R1'] +
      signalKey['R2'] +
      signalKey['B'],
  }

  charKeyRev = {}
  for ([k, v] of Object.entries(charKey)) {
    charKeyRev[v.split('').sort().join('')] = k
  }

  num = ''
  for (code of codes) {
    num += charKeyRev[code]
  }
  sum += parseInt(num)
}

console.log(sum)
