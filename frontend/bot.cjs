// const puppeteer = require('puppeteer');
// const axios = require('axios');

// // Function to introduce a delay
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// (async () => {
//     // Launch the browser
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     // Navigate to the target web page
//     await page.goto('http://localhost:5173/app'); // Update URL if needed

//     // Wait for the form to load
//     await page.waitForSelector('form');

//     // Fill out the Aadhar Number field
//     const aadharNumber = '123456789012'; // Replace with a valid Aadhar number
//     await page.waitForSelector('#aadhar');
//     await page.type('#aadhar', aadharNumber);

//     // Introduce a delay after filling the Aadhar Number field
//     await delay(3000);

//     // Fill the hidden Aadhar Number field
//     await page.waitForSelector('#hiddenAadhar');
//     await page.evaluate(() => {
//         document.querySelector('#hiddenAadhar').value = '123456789012'; // Fill the hidden field
//     });

//     // Trigger change event for the hidden field to simulate user interaction
//     await page.evaluate(() => {
//         const event = new Event('input', { bubbles: true });
//         document.querySelector('#hiddenAadhar').dispatchEvent(event);
//     });

//     // Introduce another delay before submitting
//     await delay(3000);

//     // Submit the form
//     await page.click('button[type="submit"]');

//     // Introduce a final delay before closing the browser
//     await delay(3000);

//     // Optionally, send the hidden field data to the server if needed
//     // try {
//     //     await axios.post('http://localhost:5000/api', { hiddenAadhar: '123456789012' });
//     //     console.log('Hidden field data sent successfully');
//     // } catch (error) {
//     //     console.error('Error sending data:', error.message);
//     // }

//     // Close the browser
//     await browser.close();
// })();








const puppeteer = require('puppeteer');
const axios = require('axios');

// Function to introduce a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the target web page
    await page.goto('http://localhost:5173/app'); // Update URL if needed

    // Wait for the form to load
    await page.waitForSelector('form');

    // Introduce a delay before starting form interactions
    await delay(2000); // 2 seconds delay

    // Fill out the Aadhar Number field
    const aadharNumber = '123456789012'; // Replace with a valid Aadhar number
    await page.waitForSelector('#aadhar');
    await page.type('#aadhar', aadharNumber);

    // Introduce a delay after filling the Aadhar Number field
    await delay(2000); // 2 seconds delay

    // Fill the hidden Aadhar Number field
    await page.waitForSelector('#hiddenAadhar');
    await page.evaluate(() => {
        document.querySelector('#hiddenAadhar').value = '123456789012'; // Fill the hidden field
    });

    // Trigger change event for the hidden field to simulate user interaction
    await page.evaluate(() => {
        const event = new Event('input', { bubbles: true });
        document.querySelector('#hiddenAadhar').dispatchEvent(event);
    });

    // Introduce another delay before submitting
    await delay(3000); // 2 seconds delay

    // Submit the form
    await page.click('button[type="submit"]');

    // Introduce a final delay before closing the browser
    await delay(1000); // 2 seconds delay

    // Close the browser
    await browser.close();
})();

