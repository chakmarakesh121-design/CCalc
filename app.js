const tabButtons = document.querySelectorAll('.tab-button');
const panels = document.querySelectorAll('.calculator-panel');
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');

if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      panels.forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
}

function getFieldValue(id, defaultValue = '0') {
  const field = document.getElementById(id);
  return field ? field.value : defaultValue;
}

function elementExists(id) {
  return document.getElementById(id) !== null;
}

function round(value) {
  return Number.isFinite(value) ? Math.round(value * 100) / 100 : 0;
}

function calculateCement() {
  const length = parseFloat(document.getElementById('cement-length').value) || 0;
  const width = parseFloat(document.getElementById('cement-width').value) || 0;
  const depth = parseFloat(document.getElementById('cement-depth').value) / 100 || 0;
  const ratio = parseFloat(document.getElementById('cement-ratio').value) || 1;
  const volume = length * width * depth;
  const cementBags = volume * (1 / ratio) * 20;
  const sand = round(volume * 0.4);
  const aggregate = round(volume * 0.6);
  document.getElementById('cement-result').innerHTML = `Volume: ${round(volume)} m³<br>Cement bags: ${round(cementBags)} bags<br>Sand: ${sand} m³<br>Aggregate: ${aggregate} m³`;
}

function calculateConcrete() {
  const length = parseFloat(document.getElementById('concrete-length').value) || 0;
  const width = parseFloat(document.getElementById('concrete-width').value) || 0;
  const depth = parseFloat(document.getElementById('concrete-depth').value) / 100 || 0;
  const ratio = parseFloat(document.getElementById('concrete-ratio').value) || 1;
  const volume = length * width * depth;
  const cement = round(volume * 0.33);
  const sand = round(volume * 0.65);
  const aggregate = round(volume * 1.35);
  document.getElementById('concrete-result').innerHTML = `Concrete volume: ${round(volume)} m³<br>Cement: ${cement} bags<br>Sand: ${sand} m³<br>Aggregate: ${aggregate} m³`;
}

function calculateBricks() {
  const length = parseFloat(document.getElementById('bricks-length').value) || 0;
  const height = parseFloat(document.getElementById('bricks-height').value) || 0;
  const brickSize = parseFloat(document.getElementById('brick-size').value) || 190;
  const allowance = parseFloat(document.getElementById('brick-allowance').value) || 0;
  const wallArea = length * height;
  const bricksPerM2 = 10000 / (brickSize * 90);
  const totalBricks = Math.ceil(wallArea * bricksPerM2 * (1 + allowance / 100));
  document.getElementById('bricks-result').innerHTML = `Wall area: ${round(wallArea)} m²<br>Estimated bricks: ${totalBricks} bricks`;
}

function calculatePaint() {
  const area = parseFloat(document.getElementById('paint-area').value) || 0;
  const coverage = parseFloat(document.getElementById('paint-coverage').value) || 1;
  const coats = parseFloat(document.getElementById('paint-coats').value) || 1;
  const wastage = parseFloat(document.getElementById('paint-wastage').value) || 0;
  const litres = area * coats / coverage;
  const total = round(litres * (1 + wastage / 100));
  document.getElementById('paint-result').innerHTML = `Paint required: ${total} litres (${round(litres)} litres before wastage)`;
}

function calculateTiles() {
  const length = parseFloat(document.getElementById('tile-length').value) || 0;
  const width = parseFloat(document.getElementById('tile-width').value) || 0;
  const tileSize = parseFloat(document.getElementById('tile-size').value) || 0;
  const wastage = parseFloat(document.getElementById('tile-wastage').value) || 0;
  const area = length * width;
  const tileArea = Math.pow(tileSize / 100, 2);
  const tileCount = Math.ceil(area / tileArea * (1 + wastage / 100));
  document.getElementById('tiles-result').innerHTML = `Floor area: ${round(area)} m²<br>Tile count: ${tileCount} tiles`;
}

function calculateLabour() {
  const workers = parseInt(document.getElementById('labour-workers').value) || 0;
  const hours = parseFloat(document.getElementById('labour-hours').value) || 0;
  const rate = parseFloat(document.getElementById('labour-rate').value) || 0;
  const days = parseInt(document.getElementById('labour-days').value) || 0;
  const totalCost = round(workers * hours * rate * days);
  document.getElementById('labour-result').innerHTML = `Total labour cost: ₹${totalCost}`;
}

function calculateHVAC() {
  const area = parseFloat(document.getElementById('hvac-area').value) || 0;
  const height = parseFloat(document.getElementById('hvac-height').value) || 0;
  const load = parseFloat(document.getElementById('hvac-load').value) || 1;
  const capacity = round(area * height * 150 * load);
  document.getElementById('hvac-result').innerHTML = `Suggested capacity: ${capacity} BTU/hr<br>Approx. cooling load factor: ${load}`;
}

function calculateRoofing() {
  const length = parseFloat(document.getElementById('roof-length').value) || 0;
  const width = parseFloat(document.getElementById('roof-width').value) || 0;
  const pitch = parseFloat(document.getElementById('roof-pitch').value) || 1;
  const wastage = parseFloat(document.getElementById('roof-wastage').value) || 0;
  const roofArea = round(length * width * pitch);
  const total = round(roofArea * (1 + wastage / 100));
  document.getElementById('roofing-result').innerHTML = `Roof area: ${roofArea} m²<br>Material with wastage: ${total} m²`;
}

function calculateFlooring() {
  const length = parseFloat(document.getElementById('floor-length').value) || 0;
  const width = parseFloat(document.getElementById('floor-width').value) || 0;
  const material = parseFloat(document.getElementById('floor-material').value) || 0;
  const wastage = parseFloat(document.getElementById('floor-wastage').value) || 0;
  const floorArea = length * width;
  const unitArea = Math.pow(material / 100, 2);
  const pieces = Math.ceil(floorArea / unitArea * (1 + wastage / 100));
  document.getElementById('flooring-result').innerHTML = `Floor area: ${round(floorArea)} m²<br>Material pieces: ${pieces}`;
}

function appendChat(message, fromUser = false) {
  const node = document.createElement('div');
  node.className = `chat-message ${fromUser ? 'user-message' : 'bot-message'}`;
  node.textContent = message;
  chatLog.appendChild(node);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  appendChat(text, true);
  chatInput.value = '';

  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text })
    });

    if (!response.ok) {
      throw new Error('AI backend unavailable');
    }

    const data = await response.json();
    appendChat(data.answer || generateBotResponse(text));
  } catch (error) {
    appendChat(generateBotResponse(text));
  }
}

function generateBotResponse(text) {
  const query = text.toLowerCase();
  if (query.includes('cement')) {
    return 'For cement estimates, enter slab dimensions and ratio in the cement calculator section.';
  }
  if (query.includes('paint')) {
    return 'Use the paint calculator with your surface area, coverage per litre, and coat count.';
  }
  if (query.includes('brick') || query.includes('mortar')) {
    return 'The bricks calculator can estimate brick counts based on wall dimensions and mortar allowance.';
  }
  if (query.includes('labour')) {
    return 'Enter the number of workers, hours, rate, and days in the labour cost calculator to get a full cost estimate.';
  }
  if (query.includes('hvac')) {
    return 'The HVAC tool calculates suggested BTU based on room size, height, and load factor.';
  }
  if (query.includes('roof')) {
    return 'Use the roofing calculator with pitch and wastage to determine roof material area.';
  }
  return 'I can help with cement, concrete, bricks, paint, tiles, labour, HVAC, roofing, and flooring estimates. What would you like to calculate?';
}

window.onload = () => {
  if (elementExists('cement-length')) calculateCement();
  if (elementExists('concrete-length')) calculateConcrete();
  if (elementExists('bricks-length')) calculateBricks();
  if (elementExists('paint-area')) calculatePaint();
  if (elementExists('tile-length')) calculateTiles();
  if (elementExists('labour-workers')) calculateLabour();
  if (elementExists('hvac-area')) calculateHVAC();
  if (elementExists('roof-length')) calculateRoofing();
  if (elementExists('floor-length')) calculateFlooring();
};
