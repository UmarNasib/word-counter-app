function countAll() {
    const text = document.getElementById('description').value || ''; // Get the value of the textarea
  
    // Characters
    const charCount = text.length;
  
    // Words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
  
    // Sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
  
    // Paragraphs
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;
  
    // Spaces
    const spaceCount = (text.match(/ /g) || []).length;
  
    // Update the UI with the counts
    document.getElementById('charCount').textContent = charCount;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('sentenceCount').textContent = sentenceCount;
    document.getElementById('paragraphCount').textContent = paragraphCount;
    document.getElementById('spaceCount').textContent = spaceCount;
}
  
// Debounce input
let debounceTimer;
function debounceCountAll() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(countAll, 300); // Adjust the debounce time as needed
}