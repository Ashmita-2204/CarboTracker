// ======================
// CARBON CALCULATOR (INDIA-SPECIFIC)
// ======================

// Emission Factors (India-specific, sourced from IPCC and MoEFCC)
const EMISSION_FACTORS = {
  electricity: 0.82,         // kg CO2 per kWh (Indian grid average)
  fuel: {
    petrol: 2.31,           // kg CO2 per liter
    diesel: 2.68,           // kg CO2 per liter
    cng: 2.75,              // kg CO2 per kg
    coal: 2.42              // kg CO2 per kg
  },
  flights: {
    economy: 0.12,          // kg CO2 per passenger-km
    business: 0.24,
    firstClass: 0.35
  },
  spend: {                  // kg CO2 per ₹100 spent
    electronics: 0.85,
    clothing: 0.32,
    food: 0.18,
    transport: 0.42
  }
};

// DOM Elements
const elements = {
  electricity: {
    kwh: document.getElementById('electricity-kwh'),
    result: document.getElementById('electricity-result')
  },
  fuel: {
    type: document.getElementById('fuel-type'),
    amount: document.getElementById('fuel-amount'),
    result: document.getElementById('fuel-result')
  },
  flights: {
    class: document.getElementById('flight-class'),
    distance: document.getElementById('flight-distance'),
    passengers: document.getElementById('flight-passengers'),
    tripType: document.getElementById('flight-trip-type'),
    result: document.getElementById('flight-result')
  },
  spend: {
    category: document.getElementById('spend-category'),
    amount: document.getElementById('spend-amount'),
    result: document.getElementById('spend-result')
  },
  total: document.getElementById('total-emissions')
};

// Current calculation state
let currentTotal = 0;

// ======================
// CORE CALCULATION FUNCTIONS
// ======================

function calculateElectricity() {
  const kwh = parseFloat(elements.electricity.kwh.value);
  
  if (!validateInput(kwh, 'Electricity usage')) return;

  const co2 = kwh * EMISSION_FACTORS.electricity;
  displayResult(elements.electricity.result, co2, 'kWh');
  updateTotal(co2);
}

function calculateFuel() {
  const type = elements.fuel.type.value;
  const amount = parseFloat(elements.fuel.amount.value);
  
  if (!validateInput(amount, 'Fuel amount')) return;

  const co2 = amount * EMISSION_FACTORS.fuel[type];
  displayResult(elements.fuel.result, co2, type === 'coal' ? 'kg' : 'litres');
  updateTotal(co2);
}

function calculateFlight() {
  const distance = parseFloat(elements.flights.distance.value);
  const passengers = parseInt(elements.flights.passengers.value) || 1;
  const tripMultiplier = elements.flights.tripType.value === 'roundTrip' ? 2 : 1;
  
  if (!validateInput(distance, 'Flight distance')) return;

  const co2 = distance * EMISSION_FACTORS.flights[elements.flights.class.value] * passengers * tripMultiplier;
  displayResult(elements.flights.result, co2, 'km');
  updateTotal(co2);
}

function calculateSpend() {
  const amount = parseFloat(elements.spend.amount.value);
  
  if (!validateInput(amount, 'Spend amount')) return;

  const co2 = (amount / 100) * EMISSION_FACTORS.spend[elements.spend.category.value];
  displayResult(elements.spend.result, co2, '₹');
  updateTotal(co2);
}

// ======================
// HELPER FUNCTIONS
// ======================

function validateInput(value, fieldName) {
  if (isNaN(value) || value <= 0) {
    alert(`Please enter a valid ${fieldName} (must be > 0)`);
    return false;
  }
  return true;
}

function displayResult(element, co2, unit) {
  element.textContent = `${co2.toFixed(2)} kg CO2`;
  element.parentElement.classList.add('show-result');
}

function updateTotal(co2) {
  currentTotal += co2;
  elements.total.textContent = currentTotal.toFixed(2);
}

function saveCalculation() {
  if (currentTotal <= 0) {
    alert("No calculations to save!");
    return;
  }

  // Mock save (replace with actual API call)
  localStorage.setItem('currentCalculation', currentTotal.toFixed(2));
  
  alert(`✅ Saved ${currentTotal.toFixed(2)} kg CO2 to your dashboard!`);
  
  // Reset for new session
  currentTotal = 0;
  elements.total.textContent = '0';
  document.querySelectorAll('.result-badge').forEach(el => {
    el.parentElement.classList.remove('show-result');
  });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load saved total if exists
  const savedTotal = parseFloat(localStorage.getItem('currentCalculation')) || 0;
  if (savedTotal > 0) {
    currentTotal = savedTotal;
    elements.total.textContent = savedTotal.toFixed(2);
  }
});

// connecting to backend
async function saveCalculation(calculationData) {
  try {
    const response = await fetch('/api/calculations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calculationData)
    });
    return await response.json();
  } catch (error) {
    console.error('Save failed:', error);
  }
}

async function loadUserCalculations(userId) {
  const response = await fetch(`/api/calculations/${userId}`);
  return await response.json();
}