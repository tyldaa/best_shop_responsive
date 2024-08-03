const form = {
  quantity: {
    inputProductsQuantity: document.getElementById("products_quantity"),
    productsQuantity: undefined,
    rowQuantity: document.querySelector(".row_quantity"),
  },
  orders: {
    inputEstimatedOrdersInMonth: document.getElementById("orders_month"),
    estimatedOrdersInMonth: undefined,
    rowOrders: document.querySelector(".row_orders"),
  },
  packages: {
    inputPackages: document.querySelectorAll(".select_dropdown [data-value]"),
    package: undefined,
    rowPackage: document.querySelector(".row_package"),
  },
  accounting: {
    checkboxAccounting: document.querySelector(".accounting"),
    isAccounting: false,
    rowAccounting: document.querySelector(".row_accounting"),
  },
  terminal: {
    checkboxRentalPayment: document.querySelector(".rental_payment"),
    isRentalOfAPaymentTerminal: false,
    rowTerminal: document.querySelector(".row_terminal"),
  },
  prices: {
    products: 0.5,
    orders: 0.25,
    package: {
      basic: 0,
      professional: 25,
      premium: 60,
    },
    accounting: 35,
    terminal: 5,
  },
  selectInput: document.querySelector(".select_input"),
  selectDropdown: document.querySelector(".select_dropdown"),

  showDropdown: function (event) {
    event.preventDefault();
    form.selectDropdown.classList.toggle("active");
  },

  // -------------------------------------------------- product quantity
  handleProductsQuantityChange: function (event) {
    const newValue = event.target.value;
    form.quantity.productsQuantity = newValue;
    form.updateProductsQuantityElements();
    form.quantity.inputProductsQuantity.style.color = "#3d3d3d";
    form.updateTotalPrice();
  },

  updateProductsQuantityElements: function () {
    const isRowActive = form.quantity.rowQuantity.classList.contains("active");
    const hasValue = form.quantity.productsQuantity !== "" && form.quantity.productsQuantity !== undefined;

    form.quantity.inputProductsQuantity.value = form.quantity.productsQuantity;

    if (!isRowActive && hasValue) {
      form.quantity.rowQuantity.classList.add("active");
    } else if (!hasValue) {
      form.quantity.rowQuantity.classList.remove("active");
    }

    if (hasValue) {
      form.quantity.rowQuantity.querySelector(".item_value span").innerText = form.quantity.productsQuantity;
      form.quantity.rowQuantity.querySelector(".result").innerText = `$${form.quantity.productsQuantity * form.prices.products}`;
    }
  },

  // -------------------------------------------------- numeric validator
  numericInputAllowedKeys: ["ArrowLeft", "ArrowRight", "Backspace"],
  validateNumericChange: function (event) {
    const pressedKey = event.key;
    const isNewKeyANumber = !isNaN(pressedKey);
    const isNewKeyAllowed = form.numericInputAllowedKeys.some(allowedKey => allowedKey === pressedKey);

    if (!isNewKeyANumber && !isNewKeyAllowed) {
      event.preventDefault();
    }
  },

  // -------------------------------------------------- estimate orders
  handleEstimateOrdersInMonthChange: function (event) {
    const newValue = event.target.value;
    form.orders.estimatedOrdersInMonth = newValue;
    form.updateEstimateOrdersInMonthElements();
    form.orders.inputEstimatedOrdersInMonth.style.color = "#3d3d3d";
    form.updateTotalPrice();
  },
  updateEstimateOrdersInMonthElements: function () {
    const isRowActive = form.orders.rowOrders.classList.contains("active");
    const hasValue = form.orders.estimatedOrdersInMonth !== "" && form.orders.estimatedOrdersInMonth !== undefined;

    form.orders.inputEstimatedOrdersInMonth.value = form.orders.estimatedOrdersInMonth;

    if (!isRowActive && hasValue) {
      form.orders.rowOrders.classList.add("active");
    } else if (!hasValue) {
      form.orders.rowOrders.classList.remove("active");
    }

    if (hasValue) {
      form.orders.rowOrders.querySelector(".item_value span").innerText = form.orders.estimatedOrdersInMonth;
      form.orders.rowOrders.querySelector(".result").innerText = `$${form.orders.estimatedOrdersInMonth * form.prices.orders}`;
    }
  },

  // -------------------------------------------------- package select
  handlePackageSelection: function (event) {
    const isRowActive = form.packages.rowPackage.classList.contains("active");
    const selectValue = event.target.dataset.value;
    const price = form.prices.package[selectValue];
    form.packages.package = selectValue;

    if (!isRowActive) {
      form.packages.rowPackage.classList.add("active");
    }

    form.packages.rowPackage.querySelector(".item_value").innerText = selectValue;
    form.packages.rowPackage.querySelector(".result").innerText = `$${price}`;

    form.selectDropdown.classList.remove("active");

    form.selectInput.querySelector("span").innerText = selectValue;
    form.selectInput.querySelector("span").style.color = "#3d3d3d";
    form.updateTotalPrice();
  },

  // -------------------------------------------------- checkbox
  handleCheckboxAccounting: function (event) {
    const isChecked = event.target.checked;
    form.accounting.isAccounting = isChecked;

    if (isChecked) {
      form.accounting.rowAccounting.classList.add("active");
    } else {
      form.accounting.rowAccounting.classList.remove("active");
    }
    form.updateTotalPrice();
  },

  handleCheckboxTerminal: function (event) {
    const isChecked = event.target.checked;
    form.terminal.isRentalOfAPaymentTerminal = isChecked;

    if (isChecked) {
      form.terminal.rowTerminal.classList.add("active");
    } else {
      form.terminal.rowTerminal.classList.remove("active");
    }
    form.updateTotalPrice();
  },

  // -------------------------------------------------- total price
  updateTotalPrice: function () {
    const totalSumEl = document.querySelector(".sum");
    const totalPriceQuantity = form.quantity.productsQuantity * form.prices.products || 0;
    const totalPriceOrders = form.orders.estimatedOrdersInMonth * form.prices.orders || 0;
    const totalPricePackage = form.prices.package[form.packages.package] || 0;
    const totalPriceAccounting = form.accounting.isAccounting ? form.prices.accounting : 0;
    const totalPriceTerminal = form.terminal.isRentalOfAPaymentTerminal ? form.prices.terminal : 0;

    let sum = 0;
    sum = totalPriceQuantity + totalPriceOrders + totalPricePackage + totalPriceAccounting + totalPriceTerminal;

    totalSumEl.innerText = `$${sum}`;
  },
};

// Calculator
form.quantity.inputProductsQuantity.addEventListener("keyup", form.handleProductsQuantityChange);
form.quantity.inputProductsQuantity.addEventListener("keydown", form.validateNumericChange);

form.orders.inputEstimatedOrdersInMonth.addEventListener("keyup", form.handleEstimateOrdersInMonthChange);
form.orders.inputEstimatedOrdersInMonth.addEventListener("keydown", form.validateNumericChange);

form.packages.inputPackages.forEach(function (el) {
  el.addEventListener("click", form.handlePackageSelection);
});

form.selectInput.addEventListener("click", form.showDropdown);

form.accounting.checkboxAccounting.addEventListener("click", form.handleCheckboxAccounting);
form.terminal.checkboxRentalPayment.addEventListener("click", form.handleCheckboxTerminal);

// Events hide dropdown if click document

function hideDropdownIfActive(event) {
  if (form.selectDropdown.classList.contains("active") && event.target != form.selectDropdown && event.target != form.selectInput) {
    form.selectDropdown.classList.remove("active");
  }
}

document.addEventListener("click", hideDropdownIfActive);
