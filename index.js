const rp = require('request-promise')
const cheerio = require('cheerio')

const url_base = 'https://crypto.com/price/pt-BR/'

const moedas = [
  'apecoin-ape',
  'axie-infinity',
  'bitcoin',
  'bnb',
  'ethereum',
  'jumptoken',
  'polkadot-new',
  'tron',
]

console.log("------------------------")

moedas.forEach((moeda) => {

  const options = {
    uri: url_base + moeda,
    transform: (body) => {
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
