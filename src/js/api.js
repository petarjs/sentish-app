// axios.baseURL = 'https://api.sentish.xyz/v1/'
axios.defaults.baseURL = 'http:/localhost:3000/api/v1/'

function responseTransformer (response) {
  return response.data
}

const api = {
  getTotals () {
    return Promise.resolve({ totals: 3 })
    return axios
      .get('totals')
      .then(responseTransformer)
  },
  getIssues ({ repo, username }) {
    return axios
      .get(`/github/repos/${username}/${repo}/issues`)
      .then(responseTransformer)
  }
}

window.api = api