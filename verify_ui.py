from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Wait for server
    time.sleep(5)

    print("Navigating to /immersive...")
    try:
        page.goto("http://localhost:5173/immersive")
        page.wait_for_load_state("networkidle")

        # Take screenshot of Immersive Player empty state
        page.screenshot(path="immersive_empty.png")
        print("Screenshot saved to immersive_empty.png")

    except Exception as e:
        print(f"Error: {e}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
