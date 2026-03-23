document.addEventListener("DOMContentLoaded", () => {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const selector = document.querySelector(".month-selector");

  months.forEach(month => {
    const btn = document.createElement("button");
    btn.className = "month-btn";
    btn.textContent = month;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".month-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadMonthSummary(month);
    });

    selector.appendChild(btn);
  });
});

function loadMonthSummary(monthName) {
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const monthIncomes = incomes.filter(i => {
    const date = new Date(i.date);
    return date.toLocaleString("en-US", { month: "long" }) === monthName;
  });

  const monthExpenses = expenses.filter(s => {
    const date = new Date(s.date);
    return date.toLocaleString("en-US", { month: "long" }) === monthName;
  });

  const totalIncome = monthIncomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpenses = monthExpenses.reduce((sum, s) => sum + Number(s.amount), 0);
  const balance = totalIncome - totalExpenses;

  document.getElementById("balance-amount").textContent =
    `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  const incomeList = document.getElementById("income-list-summary");
  incomeList.innerHTML = `
    <h3>INCOMES</h3>
    <p>$${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
  `;

  const expenseList = document.getElementById("expense-list-summary");
  expenseList.innerHTML = `
    <h3>EXPENSES</h3>
    <p>$${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
  `;

  renderExpensesChart(monthExpenses, monthName);
}

let expensesChart;
function renderExpensesChart(expenses, monthName) {
  const ctx = document.getElementById("expensesChart").getContext("2d");

  const categories = expenses.map(e => e.category || "Uncategorized");
  const amounts = expenses.map(e => Number(e.amount));

  if (expensesChart) {
    expensesChart.destroy();
  }

  expensesChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: [
          "#56C1E3", "#FFB703", "#E63946",
          "#2A9D8F", "#8E44AD", "#F4A261"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            font: {
              size: 14
            }
            // ✅ Default labels: just color swatches, no percentages
          }
        },
        tooltip: {
          enabled: false   // disable hover/click tooltips
        },
        title: {
          display: true,
          text: `Expenses Breakdown - ${monthName}`,
          color: "#56C1E3",     // change text color
          font: {
            size: 20,           // font size
            weight: "bold",     // bold, normal, lighter
            family: "Poppins"   // match your dashboard font
          },
          padding: {
            top: 10,
            bottom: 20          // spacing around the title
          }
        }
      }
    }
  });
}