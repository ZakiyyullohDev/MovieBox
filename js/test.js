// Get references to the container, image, and text elements
const container = document.querySelector('.container');
const imgElement = document.querySelector('.img');
const textElement = document.querySelector('.text');

// Function to truncate the text and add dots if it exceeds the image width
function truncateTextWithDots() {
  const imgWidth = imgElement.clientWidth;

  // Get the computed style of the text element
  const textStyle = window.getComputedStyle(textElement);
  const textWidth = parseInt(textStyle.width, 10);

  // Check if the text exceeds the image width
  if (textWidth > imgWidth) {
    const textContent = textElement.textContent;
    let truncatedText = '';
    let currentWidth = 0;
    const words = textContent.split(' ');

    // Loop through each word and add it to the truncatedText
    words.forEach((word) => {
      const wordWidth = measureWordWidth(word, textStyle);

      if (currentWidth + wordWidth <= imgWidth) {
        truncatedText += word + ' ';
        currentWidth += wordWidth;
      } else {
        // Stop adding words once the width exceeds the image width
        return;
      }
    });

    // Update the text content with the truncatedText and add the dots
    textElement.textContent = truncatedText.trim();
  }
}

// Function to measure the width of a word
function measureWordWidth(word, textStyle) {
  const tempSpan = document.createElement('span');
  tempSpan.textContent = word;
  tempSpan.style.font = textStyle.font;
  document.body.appendChild(tempSpan);
  const wordWidth = tempSpan.clientWidth;
  document.body.removeChild(tempSpan);
  return wordWidth;
}

// Call the function initially and on window resize
truncateTextWithDots();
window.addEventListener('resize', truncateTextWithDots);
