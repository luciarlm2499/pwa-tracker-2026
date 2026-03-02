// Format numbers with commas and two decimals
function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Save income for a given month
function saveIncome(monthPrefix) {
  const first = document.getElementById(`${monthPrefix}-first`).value;
  const second = document.getElementById(`${monthPrefix}-second`).value;

  localStorage.setItem(`${monthPrefix}-first`, first);
  localStorage.setItem(`${monthPrefix}-second`, second);

  updateTotal();
}

// Save extra income
function saveExtra() {
  const desc = document.getElementById("extra-desc").value;
  const amount = document.getElementById("extra-amount").value;

  localStorage.setItem("extra-desc", desc);
  localStorage.setItem("extra-amount", amount);

  updateTotal();
}

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