// Load saved expenses on page load
window.onload = function() {
  const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const list = document.getElementById('expenseList');
  savedExpenses.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'expense-item';
    item.innerHTML = `<strong>${exp.category}</strong>: ${exp.description} - $${exp.amount}`;
    list.appendChild(item);
  });
};

// Handle category selection
function selectCategory(cat) {
  document.getElementById('category').value = cat;

  if (cat === "Rent") {
    // Auto-fill amount
    document.getElementById('amount').value = "9500.00";
    // Auto-fill description with current month name
    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' });
    document.getElementById('description').value = monthName;
  } else {
    // Clear fields for other categories
    document.getElementById('amount').value = "";
    document.getElementById('description').value = "";
  }
}

// Save expense
function saveExpense() {
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;

  if (category && description && amount) {
    const today = new Date();   // Get current date
    const expense = {
      category,
      description,
      amount,
      date: today.toISOString() // full timestamp
    };

    // Save to localStorage
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    savedExpenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(savedExpenses));

    // Show popup with details
    document.getElementById('popupMessage').innerHTML =
      `Expense Saved:<br>${category}: ${description} - $${amount}`;
    document.getElementById('popup').style.display = 'flex';

    // Add to expense list preview
    const list = document.getElementById('expenseList');
    const item = document.createElement('div');
    item.className = 'expense-item';
    item.innerHTML = `<strong>${category}</strong>: ${description} - $${amount}`;
    list.appendChild(item);

    // Clear inputs
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
  } else {
    alert("Please fill out all fields.");
  }
}

// Close popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Reset all expenses
function resetExpenses() {
  if (confirm("Are you sure you want to clear all saved expenses?")) {
    localStorage.removeItem('expenses'); // clears only expenses
    document.getElementById('expenseList').innerHTML = ""; // clears preview list
    alert("All expenses have been reset.");
  }
}