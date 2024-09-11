document.addEventListener("DOMContentLoaded", function() {

  // Path to JSON file

  const jsonFile = 'database.json';

  // Elements from HTML

  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');
  const itemBIN = document.getElementById('itemBIN');
  const itemPCN = document.getElementById('itemPCN');
  const itemGROUP = document.getElementById('itemGROUP');

  const drugNameInsert = document.getElementById('drugNameInsert');
  const orgNameInsert = document.getElementById('orgNameInsert');
  const territoryNameInsert = document.getElementById('territoryNameInsert');

  const headerStatement = document.getElementById('headerStatement');

  // Load JSON data

  async function loadData() {
    try {
      const response = await fetch(jsonFile);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Failed to lad JSON data:', error);
      return [];
    }
  }

  // Search the data

  // Bin Search
  function searchItemBIN(items, queryBIN) {
    var nameReturn = items.filter(item => item.bin.toString().toLowerCase().includes(queryBIN));
    return nameReturn;
  }
  // PCN Search
  function searchItemPCN(items, queryPCN) {
    const lowerCaseQuery = queryPCN.toLowerCase();

    var nameReturn = items.filter(item => item.pcn.toString().toLowerCase().includes(lowerCaseQuery));
    return nameReturn;
  }
  // Group Search
  function searchItemGROUP(items, queryGROUP) {
    const lowerCaseQuery = queryGROUP.toLowerCase();
    var nameReturn = items.filter(item => item.group.toLowerCase().includes(lowerCaseQuery));
    return nameReturn;
  }

  // Display the results

  function displayResults(items) {
    if (items.length === 0) {
      headerStatement.innerHTML = '<h1>No items found</h1>';
    } else {
      resultDiv.innerHTML = items.map(item => `
        <table cellspacing="0" cellpadding="0" class="font-inter-light">
          <tr>
            <td style="width: 16.66%;">${item.formulary}</td>
            <td style="width: 16.66%;"><img src="../../assets/images/avatar-15.png" alt="avatar image" style="width: 30px;"></td>
            <td style="width: 16.66%;">${item.plantype}</td>
            <td style="width: 16.66%;">${item.coverage}</td>
            <td style="width: 16.66%;">${item.restrictions}</td>
            <td style="width: 16.66%;"><span onclick="detailInfo()" style="cursor: pointer;" class="detail-popup">&#128712;</span></td>
          </tr>
        </table>
      `).join('');

      drugNameInsert.innerHTML = `<span>${items[0].drugName}</span>`;

      // orgNameInsert.innerHTML = `<span>${items[0].formulary}</span>`;

      territoryNameInsert.innerHTML = `<span>${items[0].territoryName}</span>`;
    }
  }

  // Event listener for the search button

  searchButton.addEventListener('click', async function() {

    const queryBIN = itemBIN.value.trim();
    const queryPCN = itemPCN.value.trim();
    const queryGROUP = itemGROUP.value.trim();

    if (queryBIN) {
      const items = await loadData();
      const results = searchItemBIN(items, queryBIN);
      headerStatement.classList.remove("hide");
      headerStatement.classList.add("show");
      displayResults(results);
    }

    if (queryPCN) {
      const items = await loadData();
      const results = searchItemPCN(items, queryPCN);
      headerStatement.classList.remove("hide");
      headerStatement.classList.add("show");
      displayResults(results);
    }

    if (queryGROUP) {
      const items = await loadData();
      const results = searchItemGROUP(items, queryGROUP);
      headerStatement.classList.remove("hide");
      headerStatement.classList.add("show");
      displayResults(results);
    }

  });

});

function detailInfo() {
  var popup = document.getElementById("detailsPopup");
  popup.classList.toggle("show");
}