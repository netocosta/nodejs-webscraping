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

async function webScraping() {
  
  const resultado = []

  for (const moeda of moedas) {
    const options = {
      uri: url_base + moeda,
      transform: (body) => {
        return cheerio.load(body)
      }
    }

    await rp(options)
      .then(($) => {
        const priceIntegral = $("h2.css-1rdnxvt").text().split(" ")
        const symbol = priceIntegral[1]
        const name = $("h1.css-1xvru47").text()
        const price = new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(priceIntegral[3].replace("USD", "").replace(",", ""));

        return resultado.push({
          coin: {
            name,
            symbol,
          },
          price,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return resultado
}

webScraping()
  .then(resultado => console.log(resultado))
  .catch(error => console.log(error))
