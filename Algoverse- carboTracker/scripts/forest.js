// public/js/forest.js
function plantTree(type, cost, co2Offset) {
  const coins = parseInt(localStorage.getItem('userCoins') || 0);
  
  if (coins < cost) {
    alert("Not enough coins! Complete tasks to earn more.");
    return;
  }

  // Deduct coins
  const newCoins = coins - cost;
  localStorage.setItem('userCoins', newCoins);
  document.getElementById('user-coins').textContent = newCoins;

  // Add tree to forest
  const forest = JSON.parse(localStorage.getItem('userForest')) || [];
  forest.push({ type, co2Offset, plantedAt: new Date().toISOString() });
  localStorage.setItem('userForest', JSON.stringify(forest));

  // Update UI
  updateForestDisplay(forest);
  
  // Confetti effect (optional)
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70 });
  }
}