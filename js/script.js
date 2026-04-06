// --- Theme Management ---
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme on page load
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    if (theme === 'dark') {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
}

// --- Counter Logic ---
function countAll() {
    const text = document.getElementById('description').value || '';

    const charCount = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;
    const spaceCount = (text.match(/ /g) || []).length;

    document.getElementById('charCount').textContent = charCount;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('sentenceCount').textContent = sentenceCount;
    document.getElementById('paragraphCount').textContent = paragraphCount;
    document.getElementById('spaceCount').textContent = spaceCount;
}

let debounceTimer;
function debounceCountAll() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(countAll, 300);
}

// --- Text Manipulation Tools ---
function transformText(type) {
    const textArea = document.getElementById('description');
    let text = textArea.value;
    if (!text) return;

    switch(type) {
        case 'uppercase':
            text = text.toUpperCase();
            break;
        case 'lowercase':
            text = text.toLowerCase();
            break;
        case 'titlecase':
            text = text.toLowerCase().split(/\s+/).map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
            break;
        case 'sentencecase':
            text = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
            break;
    }

    textArea.value = text;
    countAll(); // Immediately update the stats
}

function removeExtraSpaces() {
    const textArea = document.getElementById('description');
    if (!textArea.value) return;

    // Replace multiple spaces and linebreaks with a single space, and trim edges
    textArea.value = textArea.value.replace(/\s+/g, ' ').trim();
    countAll(); // Immediately update the stats
}

// --- Text Generator Logic ---
function generateText() {
    let limit = parseInt(document.getElementById('charLimit').value);

    // Validate that limit is a number and within the acceptable range
    if (isNaN(limit) || limit <= 0 || limit > 100000) {
        showInvalidMessage("Invalid. Please enter a number in between 0 and 100000.");
        return;
    }

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
    let result = '';
    while (result.length < limit) {
        result += lorem;
    }
    document.getElementById('generatedText').value = result.substring(0, limit);
}

function clearGeneratedText() {
    document.getElementById('generatedText').value = '';
}

function clearCounterText() {
    document.getElementById('description').value = '';
    countAll();
}

// --- Modern Clipboard API ---
async function copyGeneratedText() {
    const text = document.getElementById('generatedText').value;
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);
        showCopyMessage("Generated text copied to clipboard!");
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Copy failed. Please allow clipboard permissions.');
    }
}

async function copyCounterText() {
    const text = document.getElementById('description').value;
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);
        showCopyMessage("Input text copied to clipboard!");
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Copy failed. Please allow clipboard permissions.');
    }
}

document.getElementById('pasteButton').addEventListener('click', async function () {
    const description = document.getElementById('description');
    description.focus(); // Ensures active element for paste context

    try {
      const text = await navigator.clipboard.readText();
      description.value += text;
      countAll(); // updates counter
    } catch (err) {
      alert('Paste failed. Please allow clipboard permissions.');
      console.error('Clipboard error:', err);
    }
});

// --- UI Messages ---
function showCopyMessage(message) {
    const msgBox = document.getElementById('copyMessage');
    msgBox.textContent = message;

    // Reset display to trigger the CSS animation again
    msgBox.style.display = 'none';
    msgBox.offsetHeight; // trigger reflow
    msgBox.style.display = 'block';

    // 2500ms matches the 2.5s duration in styles.css
    setTimeout(() => {
      msgBox.style.display = 'none';
    }, 2500);
}

function showInvalidMessage(message) {
    const msgBox = document.getElementById('invalidMessage');
    msgBox.textContent = message;
    msgBox.style.display = 'block';
  
    setTimeout(() => {
      msgBox.style.display = 'none';
    }, 2000);
}