const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const translateBtn = document.getElementById("translate");

const key =``
const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${key}`;

async function translate(text, target, source) {
    // Define the API endpoint with the API key

    // Prepare the request body with optional source language
    const requestBody = {
        q: text,
        target: target,
        ...(source && { source: source }) // Include source language if provided
    };
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      output.innerHTML= data.data.translations[0].translatedText;
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error; // Rethrow the error after logging, or handle it as needed
    }
  }
  translateBtn.addEventListener("click",()=>{
    console.log(inputText.value);
    translate(inputText.value,targetLanguage.value, sourceLanguage.value)
  })
  


//   async function translate() {

//     try {
//         const response = await fetch(`/translate?text=${encodeURIComponent(inputText)}&source=${sourceLanguage}&target=${targetLanguage}`);
//         const translation = await response.json();
//         document.getElementById("output").innerText = translation.translatedText;
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
