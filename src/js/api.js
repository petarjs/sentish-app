axios.baseURL = 'https://api.sentish.xyz/v1/'

function responseTransformer (response) {
  return response.data
}

const api = {
  getTotals () {
    return axios
      .get('totals')
      .then(responseTransformer)
  }
}

window.api = api