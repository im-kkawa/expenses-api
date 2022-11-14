const baseUrl = 'expenses';

async function getExpenses() {
  const id = Number(document.querySelector('.get_id').value);
  let url;

  if (id !== 0) {
    url = baseUrl + '?id=' + String(id);
  } else {
    url = baseUrl;
  }

  const data = await getRequest(url);
  viewResponseData(data);
  deleteTable();
  createTable(data);
}

async function postExpenses() {
  await postRequest(baseUrl);
  const data = await getRequest(baseUrl);
  viewResponseData(data);
  deleteTable();
  createTable(data);
}

async function deleteExpenses() {
  const id = Number(document.querySelector('.delete_id').value);
  let url;

  if (id !== 0) {
    url = baseUrl + '?id=' + String(id);
    const data = await deleteRequest(url);
    viewResponseData(data);
    deleteTable();
    createTable(data);
  }
}

async function patchExpenses() {
  await patchRequest(baseUrl);
  const data = await getRequest(baseUrl);
  viewResponseData(data);
  deleteTable();
  createTable(data);
}

function getRequest(url) {
  let result;
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.onreadystatechange = async function () {
    if (request.readyState != 4) {
      // リクエスト中
    } else if (request.status != 200) {
      // 失敗
    } else {
      // 取得成功
      result = request.responseText;
    }
  };
  request.send(null);
  return JSON.parse(result);
}

function postRequest(url) {
  const date = document.querySelector('.post_date').value;
  const category = document.querySelector('.post_category').value;
  const note = document.querySelector('.post_note').value;
  const deposit = document.querySelector('.post_deposit').value;
  const withdrawal = document.querySelector('.post_withdrawal').value;

  const postData = {
    date: date,
    category: category,
    note: note,
    deposit: deposit,
    withdrawal: withdrawal,
  };

  const request = new XMLHttpRequest();
  request.open('post', url, false);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(postData));
}

function patchRequest(url) {
  const id = Number(document.querySelector('.patch_id').value);
  const date = document.querySelector('.patch_date').value;
  const category = document.querySelector('.patch_category').value;
  const note = document.querySelector('.patch_note').value;
  const deposit = document.querySelector('.patch_deposit').value;
  const withdrawal = document.querySelector('.patch_withdrawal').value;

  const columnName = [
    'id',
    'date',
    'category',
    'note',
    'deposit',
    'withdrawal',
  ];
  const eachData = [id, date, category, note, deposit, withdrawal];
  const patchData = {};

  for (let i = 0; i < eachData.length; i++) {
    if (eachData[i] !== '') {
      patchData[columnName[i]] = eachData[i];
    }
  }

  const request = new XMLHttpRequest();
  request.open('PATCH', url, false);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(patchData));
}

function deleteRequest(url) {
  let result;
  const request = new XMLHttpRequest();
  request.open('DELETE', url, false);
  request.onreadystatechange = async function () {
    if (request.readyState != 4) {
      // リクエスト中
    } else if (request.status != 200) {
      // 失敗
    } else {
      // 取得成功
      result = request.responseText;
    }
  };
  request.send(null);
  return JSON.parse(result);
}

function deleteTable() {
  const tableAreaEl = document.querySelector('.table_area');
  const tableEl = document.querySelector('.table');
  tableAreaEl.removeChild(tableEl);
}

function createTable(data) {
  const tableAreaEl = document.querySelector('.table_area');
  const tableEl = document.createElement('table');
  tableEl.className = 'table';
  tableEl.border = 1;
  tableAreaEl.appendChild(tableEl);

  const tableHeaderRowEl = document.createElement('tr');
  tableEl.appendChild(tableHeaderRowEl);
  setTableHeader(tableHeaderRowEl, 'ID');
  setTableHeader(tableHeaderRowEl, '日付');
  setTableHeader(tableHeaderRowEl, 'カテゴリ');
  setTableHeader(tableHeaderRowEl, 'メモ');
  setTableHeader(tableHeaderRowEl, '入金額');
  setTableHeader(tableHeaderRowEl, '出金額');

  for (let eachData of data) {
    const tableDataRowEl = document.createElement('tr');
    tableEl.appendChild(tableDataRowEl);
    // console.log(eachData);
    setTableData(tableDataRowEl, eachData.id);
    setTableData(tableDataRowEl, eachData.date);
    setTableData(tableDataRowEl, eachData.category);
    setTableData(tableDataRowEl, eachData.note);
    setTableData(tableDataRowEl, eachData.deposit);
    setTableData(tableDataRowEl, eachData.withdrawal);
  }
}

function setTableHeader(tableHeaderRowEl, headerName) {
  const tableHeaderEl = document.createElement('th');
  tableHeaderEl.innerText = headerName;
  tableHeaderRowEl.appendChild(tableHeaderEl);
}

function setTableData(tableDataRowEl, eachData) {
  const tableDataEl = document.createElement('td');
  tableDataEl.innerText = eachData;
  tableDataRowEl.appendChild(tableDataEl);
}

function setTableHeader(tableHeaderRowEl, headerName) {
  const tableHeaderEl = document.createElement('th');
  tableHeaderEl.innerText = headerName;
  tableHeaderRowEl.appendChild(tableHeaderEl);
}

function viewResponseData(data) {
  const responseDataEl = document.querySelector('.response_data');
  // console.log(JSON.stringify(data, null, 2));
  responseDataEl.innerHTML = JSON.stringify(data, null, 2);
}

window.addEventListener('load', () => {
  const buttonGetAllEl = document.querySelector('.button_get');
  buttonGetAllEl.addEventListener('click', getExpenses);

  const buttonPostAllEl = document.querySelector('.button_post');
  buttonPostAllEl.addEventListener('click', postExpenses);

  const buttonDeleteAllEl = document.querySelector('.button_delete');
  buttonDeleteAllEl.addEventListener('click', deleteExpenses);

  const buttonPatchAllEl = document.querySelector('.button_patch');
  buttonPatchAllEl.addEventListener('click', patchExpenses);
});
