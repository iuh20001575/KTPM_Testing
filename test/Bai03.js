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
    const dataSuccess = await getData('Bai03_success.csv');
    const dataFail = await getData('Bai03_fail.csv');

    describe('Split Fullname', function () {
        this.timeout(3000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        for (let i = 0; i < dataSuccess.length; i++) {
            const [fullName, firstName, middleName, lastName] = splitRowData(
                dataSuccess[i],
            );

            it('Split success: ' + fullName, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai03.html',
                );

                await driver.findElement(By.id('full-name')).sendKeys(fullName);
                await driver.findElement(By.css('button')).click();

                const firstNameActual = await driver
                    .findElement(By.id('first-name'))
                    .getAttribute('value');
                const lastNameActual = await driver
                    .findElement(By.id('last-name'))
                    .getAttribute('value');
                const middleNameActual = await driver
                    .findElement(By.id('middle-name'))
                    .getAttribute('value');

                Asserts.equal(firstNameActual, firstName);
                Asserts.equal(middleNameActual, middleName);
                Asserts.equal(lastNameActual, lastName);
            });
        }

        for (let i = 0; i < dataFail.length; i++) {
            const [fullName, errorMess] = splitRowData(dataFail[i]);

            it('Split fail: ' + fullName, async function () {
                await driver.get(
                    'https://thaoanhhaa1.github.io/KTPM_Tools/Bai03.html',
                );

                await driver.findElement(By.id('full-name')).sendKeys(fullName);
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
