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
    const dataSuccess = await getData('Bai01_success.csv');
    const dataFail = await getData('Bai01_fail.csv');

    describe('Calculate electricity bill', function () {
        this.timeout(3000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        for (let i = 0; i < dataSuccess.length; i++) {
            const [oldNumber, newNumber, total] = splitRowData(dataSuccess[i]);

            it('Calculate electricity bill success: ' + i, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai01.html',
                );

                await driver.findElement(By.id('so-cu')).sendKeys(oldNumber);
                await driver.findElement(By.id('so-moi')).sendKeys(newNumber);
                await driver.findElement(By.id('button-tinh')).click();

                const totalActual = await driver
                    .findElement(By.id('thanh-tien'))
                    .getAttribute('value');

                Asserts.equal(totalActual, total);
            });
        }

        afterEach(() => driver.quit());
    });

    describe('Calculate electricity bill fail', function () {
        this.timeout(3000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        for (let i = 0; i < dataFail.length; i++) {
            const [oldNumber, newNumber, errorMess] = splitRowData(dataFail[i]);

            it('Calculate electricity bill fail: ' + i, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai01.html',
                );

                await driver.findElement(By.id('so-cu')).sendKeys(oldNumber);
                await driver.findElement(By.id('so-moi')).sendKeys(newNumber);
                await driver.findElement(By.id('button-tinh')).click();

                const errorMessActual = await driver
                    .findElement(By.className('invalid-feedback'))
                    .getAttribute('innerText');

                Asserts.equal(errorMessActual, errorMess);
            });
        }

        afterEach(() => driver.quit());
    });
})();
