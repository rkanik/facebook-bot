'use strict'

const isDev = process.env.NODE_ENV === 'developement'

const viewPort = {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1
}

// Puppeteer lauch config
let lauchConfig = {
    headless: false,
    //devtools: true,
    defaultViewport: viewPort,
    args: [
        '--start-maximized' // you can also use '--start-fullscreen'
    ]
}

// Set external chrome path if available
if (isDev && process.env.CHROME_PATH)
    lauchConfig.executablePath = process.env.CHROME_PATH

// Run headless on deployment
if (!isDev) lauchConfig = {
    ...lauchConfig, headless: true,
    args: [...lauchConfig.args, '--no-sandbox']
}

const waitUntilIdle = {
    waitUntil: 'networkidle2'
}

// Facebook config
exports.fb = {
    baseUrl: 'https://www.facebook.com/',
    permissions: ["geolocation", "notifications"],

    // CSS Selectors
    loginInputField: 'input[name="email"]',
    loginPasswordField: 'input[name="pass"]',
    loginButton: ['button[name="login"]', '#loginbutton > input'],
    groupProfileThumbnail: 'a[aria-label="Profile"]',
    groupCreatePostClose: 'div[aria-label="Close"]',
    groupPostButton: 'div[aria-label="Post"][role="button"]'
}

exports.ppt = {
    viewPort,
    lauchConfig,
    waitUntilIdle
}