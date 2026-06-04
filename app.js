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

function calculateLoanEMI() {
  const principal = parseFloat(document.getElementById('loan-principal').value) || 0;
  const annualRate = parseFloat(document.getElementById('loan-rate').value) / 100 || 0;
  const years = parseInt(document.getElementById('loan-term').value, 10) || 1;
  const downPayment = parseFloat(document.getElementById('loan-down').value) || 0;
  const loanAmount = Math.max(principal - downPayment, 0);
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  let emi = 0;

  if (months > 0) {
    if (monthlyRate > 0) {
      const factor = Math.pow(1 + monthlyRate, months);
      emi = loanAmount * monthlyRate * factor / (factor - 1);
    } else {
      emi = loanAmount / months;
    }
  }

  const totalPayment = round(emi * months);
  const totalInterest = round(totalPayment - loanAmount);
  document.getElementById('loan-emi-result').innerHTML = `Loan amount: ₹${round(loanAmount)}<br>Monthly EMI: ₹${round(emi)}<br>Total payment: ₹${totalPayment}<br>Total interest: ₹${totalInterest}`;
}

function calculateAIEstimate() {
  const projectType = document.getElementById('ai-project-type')?.value || 'Residential';
  const area = parseFloat(document.getElementById('ai-project-area')?.value) || 0;
  const finishQuality = document.getElementById('ai-finish-quality')?.value || 'Standard';
  const budgetRange = document.getElementById('ai-budget-range')?.value || 'N/A';
  const materialPreference = document.getElementById('ai-material-preference')?.value || 'Balanced';
  const siteComplexity = document.getElementById('ai-site-complexity')?.value || 'Standard';
  const notes = document.getElementById('ai-project-notes')?.value || '';

  const estimatedCement = round(area * 0.08 * (finishQuality === 'Premium' ? 1.2 : finishQuality === 'Economy' ? 0.9 : 1));
  const estimatedBricks = Math.ceil(area * 20 * (materialPreference === 'Premium' ? 1.1 : materialPreference === 'Cost-saving' ? 0.9 : 1));
  const estimatedPaint = round(area * 0.12 * (siteComplexity === 'Difficult' ? 1.15 : 1));
  const estimatedLabourDays = Math.max(1, Math.round(area / 25 * (siteComplexity === 'Difficult' ? 1.3 : 1)));

  document.getElementById('ai-estimate-result').innerHTML = `Project type: ${projectType}<br>Area: ${round(area)} m²<br>Finish: ${finishQuality}<br>Budget range: ${budgetRange}<br>Material preference: ${materialPreference}<br>Site complexity: ${siteComplexity}<br>Estimated cement: ${estimatedCement} bags<br>Estimated bricks: ${estimatedBricks} bricks<br>Estimated paint: ${estimatedPaint} litres<br>Estimated labour: ${estimatedLabourDays} days<br>Notes: ${notes}`;
}

function uploadBlueprint() {
  const fileInput = document.getElementById('blueprint-file');
  const resultBox = document.getElementById('blueprint-result');
  if (!fileInput || !fileInput.files.length) {
    if (resultBox) resultBox.textContent = 'Please select a blueprint image or PDF before uploading.';
    return;
  }

  const file = fileInput.files[0];
  if (resultBox) {
    resultBox.innerHTML = `Uploaded <strong>${file.name}</strong>. AI blueprint estimates are being prepared based on your file and will recommend materials, labour, and project scope details.`;
  }
}

function calculateAsphalt() {
  const length = parseFloat(document.getElementById('asphalt-length').value) || 0;
  const width = parseFloat(document.getElementById('asphalt-width').value) || 0;
  const depth = parseFloat(document.getElementById('asphalt-depth').value) / 100 || 0;
  const density = parseFloat(document.getElementById('asphalt-density').value) || 2.35;
  const volume = length * width * depth;
  const tons = round(volume * density);
  document.getElementById('asphalt-result').innerHTML = `Asphalt volume: ${round(volume)} m³<br>Estimated weight: ${tons} t`;
}

function calculateDrywall() {
  const area = parseFloat(document.getElementById('drywall-area').value) || 0;
  const width = parseFloat(document.getElementById('drywall-width').value) || 1.2;
  const height = parseFloat(document.getElementById('drywall-height').value) || 2.4;
  const wastage = parseFloat(document.getElementById('drywall-wastage').value) || 0;
  const sheetArea = width * height;
  const sheets = Math.ceil(area / sheetArea * (1 + wastage / 100));
  document.getElementById('drywall-result').innerHTML = `Surface area: ${round(area)} m²<br>Drywall sheets needed: ${sheets}`;
}

function calculateDeck() {
  const length = parseFloat(document.getElementById('deck-length').value) || 0;
  const width = parseFloat(document.getElementById('deck-width').value) || 0;
  const boardWidth = parseFloat(document.getElementById('deck-board-width').value) || 140;
  const gap = parseFloat(document.getElementById('deck-gap').value) || 5;
  const lineSpacing = (boardWidth + gap) / 1000;
  const boards = Math.ceil(width / lineSpacing);
  const totalLength = round(boards * length);
  const area = round(length * width);
  document.getElementById('deck-result').innerHTML = `Deck area: ${area} m²<br>Boards needed: ${boards}<br>Total board length: ${totalLength} m`;
}

function calculateGravel() {
  const length = parseFloat(document.getElementById('gravel-length').value) || 0;
  const width = parseFloat(document.getElementById('gravel-width').value) || 0;
  const depth = parseFloat(document.getElementById('gravel-depth').value) / 100 || 0;
  const density = parseFloat(document.getElementById('gravel-density').value) || 1.6;
  const volume = length * width * depth;
  const tons = round(volume * density);
  document.getElementById('gravel-result').innerHTML = `Gravel volume: ${round(volume)} m³<br>Estimated weight: ${tons} t`;
}

function calculateSquareFootage() {
  const length = parseFloat(document.getElementById('square-length').value) || 0;
  const width = parseFloat(document.getElementById('square-width').value) || 0;
  const factor = parseFloat(document.getElementById('square-factor').value) || 10.7639;
  const notes = document.getElementById('square-notes').value || '';
  const area = length * width;
  const sqFeet = round(area * factor);
  document.getElementById('square-footage-result').innerHTML = `Area: ${round(area)} m²<br>Square footage: ${sqFeet} ft²<br>${notes}`;
}

function calculateRebar() {
  const length = parseFloat(document.getElementById('rebar-length').value) || 0;
  const width = parseFloat(document.getElementById('rebar-width').value) || 0;
  const spacing = parseFloat(document.getElementById('rebar-spacing').value) || 20;
  const diameter = parseFloat(document.getElementById('rebar-diameter').value) || 12;
  const bars = Math.ceil(width / (spacing / 100)) + 1;
  const totalLength = bars * length;
  const weightPerMeter = (diameter * diameter) / 162;
  const weight = round(totalLength * weightPerMeter);
  document.getElementById('rebar-result').innerHTML = `Rebar count: ${bars}<br>Total length: ${round(totalLength)} m<br>Estimated weight: ${weight} kg`;
}

function calculateFence() {
  const length = parseFloat(document.getElementById('fence-length').value) || 0;
  const spacing = parseFloat(document.getElementById('fence-spacing').value) || 2.4;
  const gates = parseInt(document.getElementById('fence-gates').value, 10) || 0;
  const gateWidth = parseFloat(document.getElementById('fence-gate-width').value) || 1;
  const posts = Math.ceil(length / spacing) + 1;
  const railLength = round(length * 2);
  const totalGateWidth = round(gates * gateWidth);
  document.getElementById('fence-result').innerHTML = `Fence length: ${round(length)} m<br>Posts required: ${posts}<br>Rail length: ${railLength} m<br>Gate width total: ${totalGateWidth} m`;
}

function calculatePaver() {
  const length = parseFloat(document.getElementById('paver-length').value) || 0;
  const width = parseFloat(document.getElementById('paver-width').value) || 0;
  const size = parseFloat(document.getElementById('paver-size').value) || 0;
  const wastage = parseFloat(document.getElementById('paver-wastage').value) || 0;
  const area = length * width;
  const paverArea = Math.pow(size / 100, 2);
  const count = Math.ceil(area / paverArea * (1 + wastage / 100));
  document.getElementById('paver-result').innerHTML = `Paver area: ${round(area)} m²<br>Pavers needed: ${count}`;
}

window.calculateCement = calculateCement;
window.calculateConcrete = calculateConcrete;
window.calculateBricks = calculateBricks;
window.calculatePaint = calculatePaint;
window.calculateTiles = calculateTiles;
window.calculateLabour = calculateLabour;
window.calculateHVAC = calculateHVAC;
window.calculateRoofing = calculateRoofing;
window.calculateFlooring = calculateFlooring;
window.calculateLoanEMI = calculateLoanEMI;
window.calculateAIEstimate = calculateAIEstimate;
window.uploadBlueprint = uploadBlueprint;
window.calculateAsphalt = calculateAsphalt;
window.calculateDrywall = calculateDrywall;
window.calculateDeck = calculateDeck;
window.calculateGravel = calculateGravel;
window.calculateSquareFootage = calculateSquareFootage;
window.calculateRebar = calculateRebar;
window.calculateFence = calculateFence;
window.calculatePaver = calculatePaver;
window.sendChat = sendChat;

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
  if (query.includes('asphalt')) {
    return 'The asphalt calculator estimates paving volume and tonnage from length, width, and depth.';
  }
  if (query.includes('drywall') || query.includes('sheet')) {
    return 'Use the drywall calculator to estimate sheet count using surface area and sheet dimensions.';
  }
  if (query.includes('deck')) {
    return 'The deck calculator estimates board quantities from deck dimensions and board width.';
  }
  if (query.includes('gravel')) {
    return 'Use the gravel calculator to estimate volume and tonnage for your gravel bed.';
  }
  if (query.includes('fence')) {
    return 'The fence calculator estimates posts, rails, and gate allowance for your run.';
  }
  if (query.includes('paver')) {
    return 'Use the paver calculator to estimate paver count and coverage for patios and driveways.';
  }
  if (query.includes('square')) {
    return 'The square footage calculator converts length and width into square metres and square feet.';
  }
  if (query.includes('loan') || query.includes('emi')) {
    return 'Use the construction Loan EMI calculator with loan amount, interest rate, term, and down payment to see monthly payments and total interest.';
  }
  if (query.includes('blueprint') || query.includes('upload')) {
    return 'Use the AI Blueprint Upload Estimator section to upload a plan image or PDF and receive material guidance based on your file.';
  }
  if (query.includes('material') || query.includes('estimate')) {
    return 'Tell the assistant your project details or use the AI Material Estimator cards to compare cement, paint, bricks, and labour cost guidance.';
  }
  return 'I can help with cement, concrete, bricks, paint, tiles, labour, HVAC, roofing, flooring, asphalt, drywall, deck, gravel, fence, paver, square footage, and Loan EMI estimates. What would you like to calculate?';
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.querySelectorAll('.dropdown-menu a').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (href) {
          window.location.href = href;
        }
      });
    });
  }
});

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
  if (elementExists('loan-principal')) calculateLoanEMI();
  if (elementExists('ai-project-area')) calculateAIEstimate();
  if (elementExists('asphalt-length')) calculateAsphalt();
  if (elementExists('drywall-area')) calculateDrywall();
  if (elementExists('deck-length')) calculateDeck();
  if (elementExists('gravel-length')) calculateGravel();
  if (elementExists('square-length')) calculateSquareFootage();
  if (elementExists('rebar-length')) calculateRebar();
  if (elementExists('fence-length')) calculateFence();
  if (elementExists('paver-length')) calculatePaver();
};
