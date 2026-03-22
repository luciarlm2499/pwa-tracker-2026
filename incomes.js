// Format numbers with commas and two decimals
function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

let currentCategory = "Salary"; // Default category

// Toggle between Salary and Extra
function toggleExtra() {
  if (currentCategory === "Salary") {
    currentCategory = "Extra";
    alert("Extra mode ON — inputs will be saved as Extra Income.");
  } else {
    currentCategory = "Salary";
    alert("Extra mode OFF — back to Salary as default.");
  }
}

// Save income (works for both Salary and Extra)
function saveIncome() {
  const description = document.getElementById('incomeDescription').value || currentCategory;
  const amount = document.getElementById('incomeAmount').value;

  if (amount) {
    const today = new Date();
    const income = { category: currentCategory, description, amount, date: today.toISOString() };

    const savedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
    savedIncomes.push(income);
    localStorage.setItem('incomes', JSON.stringify(savedIncomes));

    renderIncomeList(savedIncomes);

    // Reset inputs
    document.getElementById('incomeDescription').value = '';
    document.getElementById('incomeAmount').value = '';

    // Reset category back to Salary after saving
    currentCategory = "Salary";
  } else {
    alert("Please enter the amount.");
  }
}

// Reset all incomes
function resetIncomes() {
  if (confirm("Are you sure you want to clear all saved incomes?")) {
    localStorage.removeItem('incomes');
    document.getElementById('incomeList').innerHTML = "";
    alert("All incomes have been reset.");
  }
}

// Render preview list
function renderIncomeList(incomes) {
  const list = document.getElementById('incomeList');
  list.innerHTML = "";

  incomes.forEach(income => {
    const item = document.createElement('div');
    item.className = 'income-item';
    const date = new Date(income.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Format amount with commas and .00
    const formattedAmount = Number(income.amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });

    item.innerHTML = `
      <div class="income-month"><strong>${monthYear}</strong></div>
      <div>${income.category}: ${income.description} - $${formattedAmount}</div>
    `;
    list.appendChild(item);
  });
}

// Load preview list on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
  renderIncomeList(savedIncomes);
});

/*
// Load saved values when page starts
function loadSavedData() {
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

  months.forEach(m => {
    const first = localStorage.getItem(`${m}-first`);
    const second = localStorage.getItem(`${m}-second`);

    if (first !== null) document.getElementById(`${m}-first`).value = first;
    if (second !== null) document.getElementById(`${m}-second`).value = second;
  });

  const extraDesc = localStorage.getItem("extra-desc");
  const extraAmount = localStorage.getItem("extra-amount");

  if (extraDesc !== null) document.getElementById("extra-desc").value = extraDesc;
  if (extraAmount !== null) document.getElementById("extra-amount").value = extraAmount;

  updateTotal();
}

// Calculate total with formatting
function updateTotal() {
  let total = 0;
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

  months.forEach(m => {
    const first = parseFloat(localStorage.getItem(`${m}-first`)) || 0;
    const second = parseFloat(localStorage.getItem(`${m}-second`)) || 0;
    total += first + second;
  });

  const extra = parseFloat(localStorage.getItem("extra-amount")) || 0;
  total += extra;

  // Show formatted total
  document.getElementById("total").textContent = formatCurrency(total);
}

// Toggle month collapsible
function toggleMonth(monthId) {
  const box = document.getElementById(monthId);
  box.classList.toggle("hidden");
}

// Toggle extra income collapsible
function toggleExtra() {
  const box = document.getElementById("extra");
  box.classList.toggle("hidden");
}

// Run when page loads
window.onload = loadSavedData;
*/
