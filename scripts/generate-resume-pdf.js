const { chromium } = require('playwright');
const path = require('path');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load the resume HTML file
  const resumePath = path.join(__dirname, '..', 'public', 'resume.html');
  await page.goto(`file://${resumePath}`, { waitUntil: 'networkidle' });

  // Force light mode for better PDF printing
  await page.evaluate(() => {
    document.body.classList.add('light-mode');
  });

  // Wait for fonts to load
  await page.waitForTimeout(1000);

  // Generate PDF
  const outputPath = path.join(__dirname, '..', 'public', 'david-anderson-resume.pdf');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.3in',
      bottom: '0.3in',
      left: '0.3in',
      right: '0.3in'
    }
  });

  console.log(`PDF generated: ${outputPath}`);
  await browser.close();
}

generatePDF().catch(console.error);
