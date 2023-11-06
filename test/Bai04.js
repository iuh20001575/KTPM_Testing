const { describe, it, beforeEach, afterEach } = require('mocha');
const { Builder, By, Browser } = require('selenium-webdriver');
const fs = require('fs');
const Asserts = require('assert');

const getData = async (filename) =>
    fs
        .readFileSync(
            __dirname.replace('test', 'data') + `\\${filename}`,
            'utf8',
        )
        .split('\n');

const splitRowData = (data) => data.split('\r')[0].split(',');

(async () => {
    const dataSuccess = await getData('Bai04_success.csv');
    const dataFail = await getData('Bai04_fail.csv');

    describe('Sort Array', function () {
        this.timeout(3000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        for (let i = 0; i < dataSuccess.length; i++) {
            const [arr, arrResult] = splitRowData(dataSuccess[i]);

            it('Sort array success: ' + arr, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai04.html',
                );

                await driver.findElement(By.id('full-name')).sendKeys(arr);
                await driver.findElement(By.css('button')).click();

                const arrResultActual = await driver
                    .findElement(By.id('result'))
                    .getAttribute('value');

                Asserts.equal(arrResultActual, arrResult);
            });
        }

        afterEach(() => driver.quit());
    });

    describe('Sort array fail', function () {
        this.timeout(3000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        for (let i = 0; i < dataFail.length; i++) {
            const [arr, errorMess] = splitRowData(dataFail[i]);

            it('Sort array fail: ' + arr, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai04.html',
                );

                await driver.findElement(By.id('full-name')).sendKeys(arr);
                await driver.findElement(By.css('button')).click();

                const errorMessActual = await driver
                    .findElement(By.className('invalid-feedback'))
                    .getAttribute('innerText');

                Asserts.equal(errorMessActual, errorMess);
            });
        }

        afterEach(() => driver.quit());
    });
})();
