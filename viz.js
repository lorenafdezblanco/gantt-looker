const dscc = require('@google/dscc');

function toDate(v) {
  return new Date(v);
}

function drawViz(data) {
  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '100%';
  document.body.appendChild(container);

  const rows = data.tables.DEFAULT.rows;
  const headers = data.tables.DEFAULT.headers;

  const iTask = headers.findIndex(h => h.configId==='task');
  const iStart = headers.findIndex(h => h.configId==='start');
  const iEnd = headers.findIndex(h => h.configId==='end');

  rows.forEach((r, index) => {
    const task = r[iTask];
    const start = new Date(r[iStart]);
    const end = new Date(r[iEnd]);
    const bar = document.createElement('div');
    bar.textContent = task;
    bar.style.backgroundColor = '#1a73e8';
    bar.style.height = '24px';
    bar.style.margin = '2px';
    bar.style.width = Math.max(20,(end-start)/100000000)+'px';
    container.appendChild(bar);
  });
}

dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
