// Portfolio de Criptomonedas

const portfolio = JSON.parse(localStorage.getItem('portfolio')) || []

const form = document.getElementById('addCryptoForm')

form.addEventListener('submit', function (event) {

        event.preventDefault()

        const cryptoNameInput = document.getElementById('cryptoName').value.toLowerCase()
        const cryptoBuyPrice = parseFloat(document.getElementById('cryptoPrice').value)
        const cryptoUSD = parseFloat(document.getElementById('cryptoUSD').value)

        const validNames = ['bitcoin', 'ethereum', 'solana', 'binancecoin']
        if (
        !validNames.includes(cryptoNameInput) ||
        isNaN(cryptoUSD) ||
        isNaN(cryptoBuyPrice) ||
        cryptoUSD <= 0 ||
        cryptoBuyPrice <= 0
) {
        alert(
                'Por favor, ingrese datos válidos.\nNombres válidos: bitcoin, ethereum, solana, binancecoin'
        )
        return
}

const amount = cryptoUSD / cryptoBuyPrice

portfolio.push({
        name: cryptoNameInput,
        amount: amount,
        buyPrice: cryptoBuyPrice
})

localStorage.setItem('portfolio', JSON.stringify(portfolio))

ObtenerCriptoPrices()
form.reset()
})

async function ObtenerCriptoPrices() {
        const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd'
)
const data = await response.json()

const portfolioDiv = document.getElementById('portfolio')
portfolioDiv.innerHTML = ''

let totalInvested = 0
let totalCurrent = 0

portfolio.forEach((crypto, index) => {
        const currentPrice = data[crypto.name].usd
        const currentValue = crypto.amount * currentPrice
        const invested = crypto.amount * crypto.buyPrice
        const profit = currentValue - invested

        totalInvested += invested
        totalCurrent += currentValue

        const div = document.createElement('div')
        div.className = 'asset'
        div.innerHTML = `
            <div>${crypto.name.toUpperCase()}</div>
            <div>Cantidad: ${crypto.amount.toFixed(6)}</div>
            <div>Precio Compra: $${crypto.buyPrice.toFixed(2)}</div>
            <div>Precio Actual: $${currentPrice.toFixed(2)}</div>
            <div class="profit ${
                profit > 0 ? 'positive' : profit < 0 ? 'negative' : 'neutral'
            }">Ganancia/Pérdida: $${profit.toFixed(2)}</div>
            <button class="delete">Borrar</button>
        `

        div.querySelector('.delete').addEventListener('click', () => {
                portfolio.splice(index, 1)
                localStorage.setItem('portfolio', JSON.stringify(portfolio))
                ObtenerCriptoPrices()
        })

        portfolioDiv.appendChild(div)
})

    // Mostrar totales
const totalDiv = document.createElement('div')
totalDiv.className = 'asset'
const totalProfit = totalCurrent - totalInvested
totalDiv.innerHTML = `
        <div><strong>Total Invertido:</strong> $${totalInvested.toFixed(2)}</div>
        <div><strong>Valor Actual:</strong> $${totalCurrent.toFixed(2)}</div>
        <div class="profit ${totalProfit > 0 ? 'positive' : totalProfit < 0 ? 'negative' : 'neutral'}">
            <strong>Ganancia/Pérdida Total:</strong> $${totalProfit.toFixed(2)}
        </div>
    `
portfolioDiv.appendChild(totalDiv)
}

// Inicializar al cargar la página
ObtenerCriptoPrices()
setInterval(ObtenerCriptoPrices, 10000)
