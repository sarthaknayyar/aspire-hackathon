const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeTwitterGrievances(keywords, count = 10) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let grievances = [];

    for (let keyword of keywords) {
        console.log(`Fetching tweets for: ${keyword}`);
        await page.goto(`https://twitter.com/search?q=${encodeURIComponent(keyword)}&src=typed_query`, {
            waitUntil: 'networkidle2',
        });

        await new Promise(resolve => setTimeout(resolve, 5000)); // Correct function


        let tweets = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('article div[lang]'))
                .map(tweet => tweet.innerText)
                .slice(0, 10);
        });

        tweets.forEach(tweet => grievances.push({ category: keyword, tweet }));
    }

    await browser.close();

    // Save to CSV
    let csvContent = 'Category,Tweet\n' + grievances.map(row => `"${row.category}","${row.tweet}"`).join('\n');
    fs.writeFileSync('government_grievances_twitter.csv', csvContent);
    console.log('✅ Government grievance data saved as government_grievances_twitter.csv');
}

// Define government-related grievance keywords
const govtKeywords = [
    "Water Crisis", "Railway Problems", "Electricity Issues",
    "Bad Roads", "Public Transport", "Municipal Complaints"
];

// Run the scraper
scrapeTwitterGrievances(govtKeywords);
