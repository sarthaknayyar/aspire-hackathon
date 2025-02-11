import requests
import pandas as pd
import time
import os

# Step 1: Install Dependencies (Run this manually in terminal before execution)
# sudo apt update && sudo apt install -y redis
# pip install nim selenium webdriver-manager pandas ntscraper

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

# Configure Selenium WebDriver for local execution
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Function to scrape Twitter grievances locally using Selenium
def scrape_twitter_grievances(keywords, count=10):
    grievance_data = []
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    for keyword in keywords:
        print(f"Fetching tweets for: {keyword}")
        driver.get(f"https://twitter.com/search?q={keyword}&src=typed_query")
        time.sleep(5)  # Wait for page to load
        tweets = driver.find_elements(By.XPATH, '//div[@data-testid="tweetText"]')
        
        for tweet in tweets[:count]:
            grievance_data.append([keyword, tweet.text])
        
        time.sleep(2)  # Sleep to avoid being blocked
    
    driver.quit()
    return grievance_data

# Define government-related grievance hashtags
govt_keywords = [
    "Water Crisis", "Railway Problems", "Electricity Issues",
    "Bad Roads", "Public Transport", "Municipal Complaints"
]

# Scrape grievances
grievances = scrape_twitter_grievances(govt_keywords, count=10)

# Convert to DataFrame
df = pd.DataFrame(grievances, columns=["Category", "Tweet"])

# Save to CSV
df.to_csv("government_grievances_twitter.csv", index=False)

print("✅ Government grievance data saved as government_grievances_twitter.csv")
