const container = document.getElementById('data');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search');

async function fetchData(url = '/api/data') {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error: ", error);
        container.innerHTML = `<h1 class="error">Error loading data.</h1>`;
    }
}

async function renderData(query = '') {
    container.innerHTML = `<h1 class="loading">Loading CVEs...</h1>`;
    // Here i´m setting the url to fetch the data
    const url = query ? `/search?query=${query}` : '/api/data';
    const data = await fetchData(url);
    // checking if the data is empty, and if i´m reeturning an error message
    if (!data || !data.vulnerabilities) {
        container.innerHTML = `<h1 class="error">No data found.</h1>`;
        return;
    }
    
    const vulnerabilitiesHtml = data.vulnerabilities.map(vulnerability => `
        <div class="vulnerability">
            <div>
                <h2>${vulnerability.cve.id}</h2>
                <p><strong>Description:</strong> ${vulnerability.cve.descriptions[0].value}</p>
                <p><strong>Published:</strong> ${new Date(vulnerability.cve.published).toLocaleDateString()}</p>
                <p><strong>Last Modified:</strong> ${new Date(vulnerability.cve.lastModified).toLocaleDateString()}</p>
                <p><strong>Vulnerability Status:</strong> ${vulnerability.cve.vulnStatus}</p>
            </div>
            <div class="l right"></div>
        </div>
    `).join('');

    container.innerHTML = vulnerabilitiesHtml;
}
// Here i´m adding an event listener to the search form
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    renderData(searchInput.value);
});

// Here i´m calling the renderData function
renderData();
