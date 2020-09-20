'use strict'

const puppeteer = require('puppeteer')
const { ppt, fb } = require('./config')

class Facebook {

    constructor() {

        // User credentials
        this.userName = process.env.FB_USERNAME
        this.password = process.env.FB_PASSWORD

        // Configs
        this.ppt = ppt
        this.fb = fb

    }

    async init() {

        // Launching browser
        this.browser = await puppeteer.launch(this.ppt.lauchConfig);

        // Creating new page
        this.page = await this.browser.newPage();

        // Overriding permissions
        this.context = this.browser.defaultBrowserContext();
        this.context.overridePermissions(this.fb.baseUrl, this.fb.permissions);

        // Setting up viewport
        await this.page.setViewport(this.ppt.viewPort);
    }

    async getLoginButton() {

        for (let btn of this.fb.loginButton) {
            let btnEl = await this.page.$(btn)
            if (btnEl) return btn
        }
        return null
    }

    async hasSelector(selector) {
        return await this.page.$(selector) !== null
    }

    async getClasses(selector, deepth) {
        return await this.page.$eval(selector, (el, deepth) => {
            return Array
                .from(deepth.reduce((a, b) => a[b], el).classList)
                .reduce((c, d) => c + '.' + d, '')
        }, deepth)
    }

    async login() {

        try {
            if (!this.page) throw new Error('Please initialize puppeteer first')

            if (!this.userName || !this.password) throw new Error('No Username or Password specified')

            // Goting to facebook
            await this.page.goto(this.fb.baseUrl, this.ppt.waitUntilIdle);

            // Typing username
            await this.page.type(this.fb.loginInputField, this.userName, { delay: 100 });

            // Typing password
            await this.page.type(this.fb.loginPasswordField, this.password, { delay: 100 });

            let loginButton = await this.getLoginButton()

            if (!loginButton) throw new Error('No login button found')

            // Clicking login button
            await this.page.click(loginButton)

            await this.page.waitForNavigation(this.ppt.waitUntilIdle)

            return {
                success: true,
                message: "Logged In"
            }
        }
        catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    async postToGroup({ groups, post, testMode }) {

        if ((Array.isArray(groups) && !groups.length) || (typeof groups === 'string' && groups.trim() === '')) {
            throw new Error('Please give valid ground url')
        }

        groups = Array.isArray(groups) ? groups : [groups]

        for (let group of groups) {

            // Going to group
            await this.page.goto(group, this.ppt.waitUntilIdle)
            await this.page.waitForSelector(this.fb.groupProfileThumbnail)

            // Selecting create post button
            let createPostButton = await this.getClasses(
                this.fb.groupProfileThumbnail, [
                'parentElement', 'parentElement', 'parentElement', 'children', 1
            ])

            // Creating post
            await this.page.click(createPostButton)
            await this.page.waitForTimeout(5000)
            await this.page.keyboard.type(post, { delay: 100 });

            if (testMode) {
                // Close the create post window
                let hasClose = await this.hasSelector(this.fb.groupCreatePostClose)
                hasClose && await this.page.click(this.fb.groupCreatePostClose)
                await this.page.waitForTimeout(1000)
                continue
            }

            // Click actual post button
            await this.page.click(this.fb.groupPostButton)
            await this.page.waitForTimeout(3000)

        }
    }

    async close() {
        this.browser && this.browser.close()
    }
}

module.exports = Facebook