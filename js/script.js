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
  
  function generateText() {
    const limit = parseInt(document.getElementById('charLimit').value);
    if (isNaN(limit) || limit <= 0) {
      alert("Please enter a valid number of characters.");
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
  
  function copyGeneratedText() {
    const textArea = document.getElementById('generatedText');
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    showCopyMessage("Generated text copied to clipboard!");
  }
  
  function clearCounterText() {
    document.getElementById('description').value = '';
    countAll();
  }
  
  function copyCounterText() {
    const textArea = document.getElementById('description');
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    showCopyMessage("Input text copied to clipboard!");
  }

  function showCopyMessage(message) {
    const msgBox = document.getElementById('copyMessage');
    msgBox.textContent = message;
    msgBox.style.display = 'block';
  
    setTimeout(() => {
      msgBox.style.display = 'none';
    }, 2000);
  }  