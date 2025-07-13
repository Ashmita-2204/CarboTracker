// public/js/tasks.js
const TASKS = {
  1: { coins: 50, name: "Use Public Transport" },
  2: { coins: 100, name: "Plant a Tree" },
  3: { coins: 75, name: "Recycle Waste" }
};

function submitTask(taskId) {
  const fileInput = document.getElementById(`task-${taskId}-proof`);
  if (!fileInput.files[0]) {
    alert("Please upload proof first!");
    return;
  }

  // Simulate API call
  setTimeout(() => {
    const currentCoins = parseInt(localStorage.getItem('userCoins') || 0);
    const newCoins = currentCoins + TASKS[taskId].coins;
    
    localStorage.setItem('userCoins', newCoins);
    document.getElementById('user-coins').textContent = newCoins;
    
    // Visual feedback
    const coinElement = document.querySelector('.coin-icon');
    coinElement.classList.add('animate-pulse-once');
    setTimeout(() => coinElement.classList.remove('animate-pulse-once'), 1000);
    
    alert(`✅ Task submitted! +${TASKS[taskId].coins} coins earned`);
    fileInput.value = '';
    document.getElementById(`task-${taskId}-filename`).textContent = 'No file chosen';
  }, 1000);
}