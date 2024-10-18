const balanceAmount = document.getElementById('balanceAmount');
const incomeAmount = document.getElementById('incomeAmount');
const expenseAmount = document.getElementById('expenseAmount');
const transactionList = document.getElementById('transactionList');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [];

// Add transaction
function addTransaction(transaction) {
  dummyTransactions.push(transaction);
  updateDOM();
}


function generateTransactionDOM(transaction) {
  const item = document.createElement('li');
  const sign = transaction.amount < 0 ? '-' : '+';
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>`;
  return item;
}


function updateDOM() {
  transactionList.innerHTML = '';
  const amounts = dummyTransactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

  balanceAmount.innerText = `$${total}`;
  incomeAmount.innerText = `+$${income}`;
  expenseAmount.innerText = `-$${expense}`;

  dummyTransactions.forEach(transaction => {
    transactionList.appendChild(generateTransactionDOM(transaction));
  });
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const transactionText = text.value.trim();
  const transactionAmount = +amount.value.trim();

  if (transactionText && !isNaN(transactionAmount)) {
    addTransaction({ text: transactionText, amount: transactionAmount });
    text.value = '';
    amount.value = '';
  }
});
