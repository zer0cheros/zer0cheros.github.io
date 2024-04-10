

async function fetchApi(req, res) {
    const response = await fetch('https://services.nvd.nist.gov/rest/json/cves/2.0/?resultsPerPage=50&startIndex=0')
    const data = await response.json()
    return data
}

async function fetchApiByParams(req, res, parsedUrl) {
    const query = parsedUrl.query.query; 
    const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${query}&resultsPerPage=50&startIndex=0`)
    const data = await response.json()
    return data
}

exports.fetchApi = fetchApi;
exports.fetchApiByParams = fetchApiByParams;