const rp = require('request-promise')
const cheerio = require('cheerio')

const moedas = [
  'https://crypto.com/price/pt-BR/apecoin-ape',
  'https://crypto.com/price/pt-BR/axie-infinity',
  'https://crypto.com/price/pt-BR/polkadot-new',
  'https://crypto.com/price/pt-BR/tron',
  'https://crypto.com/price/pt-BR/jumptoken',
  'https://crypto.com/price/pt-BR/bitcoin',
  'https://crypto.com/price/pt-BR/ethereum',
  'https://crypto.com/price/pt-BR/bnb',
]

console.log("------------------------")

moedas.forEach((url) => {
  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body)
    }
  }
    
  rp(options)
    .then(($) => {
      const text = $("h2.css-1rdnxvt").text().split(" ")
      const moeda = text[1]
      let valor = text[3].replace("USD", "").replace(",", "")
      valor = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(valor);
      
      console.log(`MOEDA: ${moeda}`)
      console.log(`VALOR: ${valor}`)
      console.log("------------------------")
    })
    .catch((err) => {
      console.log(err);
    })
})




  /// html/body/div[1]/div/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div[1]/div/span
