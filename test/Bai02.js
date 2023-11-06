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
    const dataBTDSuccess = await getData('Bai02_BTD_success.csv');
    const dataBTDFail = await getData('Bai02_BTD_fail.csv');
    const dataDTBSuccess = await getData('Bai02_DTB_success.csv');
    const dataDTBFail = await getData('Bai02_DTB_fail.csv');

    describe('Convert number', function () {
        this.timeout(3000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        for (let i = 0; i < dataDTBSuccess.length; i++) {
            const [decimal, binaryResult] = splitRowData(dataDTBSuccess[i]);

            it('Convert decimal to binary success: ' + i, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai02.html',
                );

                await driver
                    .findElement(By.id('so-decimal1'))
                    .sendKeys(decimal);
                await driver.findElement(By.id('btnDecToBin')).click();

                const binaryResultActual = await driver
                    .findElement(By.id('so-binary1'))
                    .getAttribute('value');

                Asserts.equal(binaryResultActual, binaryResult);
            });
        }

        for (let i = 0; i < dataDTBFail.length; i++) {
            const [decimal, errorMess] = splitRowData(dataDTBFail[i]);

            it('Convert decimal to binary fail: ' + i, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai02.html',
                );

                await driver
                    .findElement(By.id('so-decimal1'))
                    .sendKeys(decimal);
                await driver.findElement(By.id('btnDecToBin')).click();

                const errorMessActual = await driver
                    .findElement(By.className('invalid-feedback'))
                    .getAttribute('innerText');

                Asserts.equal(errorMessActual, errorMess);
            });
        }

        for (let i = 0; i < dataBTDSuccess.length; i++) {
            const [binary, decimalResult] = splitRowData(dataBTDSuccess[i]);

            it('Convert binary to decimal success: ' + i, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai02.html',
                );

                await driver.findElement(By.id('so-binary2')).sendKeys(binary);
                await driver.findElement(By.id('btnBinToDec')).click();

                const decimalResultActual = await driver
                    .findElement(By.id('so-decimal2'))
                    .getAttribute('value');

                Asserts.equal(decimalResultActual, decimalResult);
            });
        }

        for (let i = 0; i < dataBTDFail.length; i++) {
            const [binary, errorMess] = splitRowData(dataBTDFail[i]);

            it('Convert binary to decimal fail: ' + i, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai02.html',
                );

                await driver.findElement(By.id('so-binary2')).sendKeys(binary);
                await driver.findElement(By.id('btnBinToDec')).click();

                const errorMessActual = await driver
                    .findElement(By.id('error'))
                    .getAttribute('innerText');

                Asserts.equal(errorMessActual, errorMess);
            });
        }

        afterEach(() => driver.quit());
    });
})();
