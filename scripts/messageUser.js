const vanilla = require('puppeteer');
const { addExtra } = require('puppeteer-extra');
const { Cluster } = require('puppeteer-cluster');

const args = process.argv.slice(2);

global.WORKER_ID = 0;
global.USER_IDS = args[0].split(",");

// Main stuff
(async() => {

    const Stealth = require('puppeteer-extra-plugin-stealth');
    const puppeteer = addExtra(vanilla);
    puppeteer.use(Stealth());

    const clust = await Cluster.launch({
        puppeteer,
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: USER_IDS.length,
        monitor: false,
        puppeteerOptions: {
            headless: true
        },
        sameDomainDelay: 15000,
        timeout: 86400000
    });

    clust.on('taskerror', (err, data) => {
        console.log(err.message);
    });

    await clust.task(async ({ page, data: url }) => {

            async function login(user, passw) {
                await page.click('input[aria-label="Email or Phone Number"]');
                await page.type('input[aria-label="Email or Phone Number"]', user, {delay: 20});
                await page.click('input[aria-label="Password"]');
                await page.type('input[aria-label="Password"]', passw, {delay: 20});
                await page.click('button[type="submit"]').then(() => page.waitForSelector("nav[aria-label*='Server']"));      
            }

            async function doubleClick(selector) {
                await page.click(selector);
                await page.waitForTimeout(1000);
                await page.click(selector);
            }

            async function getIDfromFile(id) {
                return USER_IDS[id];
            }

            console.log("PROCESS: Launching spam worker #" + (WORKER_ID+1) + " ("+args[4]+" messages being sent).");
            await page.goto(url, {waitUntil: 'networkidle2'});
            await login(args[1], args[2], 2);
            await getIDfromFile(WORKER_ID).then(i => {
                page.goto("https://discord.com/users/"+i);
                WORKER_ID++;
            });
            await page.waitForTimeout(1000);
            await page.waitForSelector("[class*='additionalActionsIcon-']");
            await doubleClick("[class*='additionalActionsIcon-']"); // fuck discord so much lol

            await page.waitForSelector("[id*='-actions-user-message']");
            await page.click("[id*='-actions-user-message']");

            await page.waitForSelector("[aria-label*='Message @']");
            await page.click("[aria-label*='Message @']");
            await page.waitForTimeout(1000);

            for(x = 0; x<args[4]; x++) {
                await page.type("[aria-label*='Message @']", args[3], {delay: 100});
                await page.keyboard.press('Enter');
            }

            await page.waitForTimeout(1000);

    });

    for(x = 0; x<USER_IDS.length; x++) {
        clust.queue("https://discordapp.com/login");
    }

    await clust.idle();
    await clust.close();
    
})(); 