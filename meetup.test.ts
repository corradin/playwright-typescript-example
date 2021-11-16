import { chromium, webkit, firefox, devices } from 'playwright';

(async () => {
    for (const browserType of [chromium, webkit, firefox]) {
        const browser = await browserType.launch();
        const page = await browser.newPage();
        await page.goto('https://www.meetup.com');
        await page.screenshot({
            path: `screenshots/${browserType.name()}.png`,
        });
        await browser.close();
    }
})();

(async () => {
    const browser = await chromium.launch();
    const device = devices['Galaxy S9+ landscape'];
    // Contexts are cheap to create, instead of launching a browser
    const context = await browser.newContext({
        ...device,
    });
    const page = await context.newPage();
    await page.goto('https://www.meetup.com');
    await page.screenshot({
        path: `screenshots/galaxy-s9.png`,
    });
    await browser.close();
})();

(async () => {
    const browser = await chromium.launch();
    for (const deviceName of ['Galaxy S9+ landscape', 'Pixel 2 XL', 'Nexus 10']) {
        const device = devices[deviceName];
        console.log(device.defaultBrowserType);
        const context = await browser.newContext({
            ...device,
        });
        const page = await context.newPage();
        await page.goto('https://www.meetup.com');
        await page.screenshot({
            path: `screenshots/${deviceName.replace(/\s/g, '-')}.png`,
        });
    }
    await browser.close();
})();
