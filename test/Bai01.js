const { describe, it, beforeEach, afterEach } = require('mocha');
const { Builder, By, Browser } = require('selenium-webdriver');
const fs = require('fs');
const Asserts = require('assert');

const getData = (name, url) => {
    const filename = `./data/${name}.json`;

    describe('Calculate electricity bill', function () {
        this.timeout(15000);

        let driver;

        beforeEach(
            () => (driver = new Builder().forBrowser(Browser.CHROME).build()),
        );

        it('Calculate electricity bill success', async function () {
            await driver.get(url);

            const data = [];

            if (fs.existsSync(filename)) {
                const existingData = fs.readFileSync(filename, 'utf8');
                console.log('🚀 ~ existingData:', existingData);

                try {
                    data.push(...JSON.parse(existingData));
                } catch (error) {
                    console.error(error);
                    console.error(
                        `Error parsing existing JSON data: ${error.message}`,
                    );
                }
            }

            const images = await driver.findElements(
                By.css('.sh-dgr__content img'),
            );

            const names = await driver.findElements(
                By.css('.sh-dgr__content .tAxDx'),
            );
            await new Promise((r) => {
                images.forEach(async (imgTag, index, arr) => {
                    const srcAttribute = await imgTag.getAttribute('src');
                    const nameAttribute = await names[index].getText();
                    if (srcAttribute)
                        data.push({
                            name: nameAttribute,
                            url: srcAttribute,
                        });

                    if (index === arr.length - 1) r();
                });
            });

            const updatedData = JSON.stringify(data, null, 2);

            fs.writeFileSync(filename, updatedData);

            Asserts.equal(true, true);
        });

        afterEach(() => driver.quit());
    });
};

const urls = [
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKkS-ILGqgFRTWdMZyW9TswnoFYouA:1700536845267&ei=DSJcZan1D9iC2roP85ip4AE&start=0&sa=N&ved=0ahUKEwjpr9u0kdSCAxVYgVYBHXNMChw4PBDy0wMI6w4&biw=1409&bih=877&dpr=1',
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKl-cpTNPhgTlaOe0vRL6bS9tDG9NQ:1700537021779&ei=vSJcZYnRLvLf2roPpNmu6AE&start=60&sa=N&ved=0ahUKEwjJo_CIktSCAxXyr1YBHaSsCx0Q8tMDCM8M&biw=1409&bih=877&dpr=1',
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKnJMe4SGML8w5taNFNmu28ahI5XZA:1700537051585&ei=2yJcZaiDI7bn2roPxeWf4AE&start=120&sa=N&ved=0ahUKEwjo3IuXktSCAxW2s1YBHcXyBxw4PBDy0wMI6A4&biw=1409&bih=877&dpr=1',
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKk-hC5-BFP09MNQZkC2OUgLOapJhg:1700537119424&ei=HyNcZdzGGcTl2roPvJ2C4AE&start=180&sa=N&ved=0ahUKEwic0ri3ktSCAxXEslYBHbyOABw4eBDy0wMIsg4&biw=1409&bih=877&dpr=1',
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKkikAELmyQ-ssujVBpX6MueyEO3aQ:1700537152819&ei=QCNcZa7SManh2roPwOGG6AE&start=240&sa=N&ved=0ahUKEwiu8q7HktSCAxWpsFYBHcCwAR04tAEQ8tMDCPQN&biw=1409&bih=877&dpr=1',
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKkkA2afPlBn2EG7Wh5USeaxj0AqbA:1700537198326&ei=biNcZeKxE5Or0-kPgqWV4AE&start=300&sa=N&ved=0ahUKEwjioIjdktSCAxWT1TQHHYJSBRw48AEQ8tMDCO0N&biw=1409&bih=877&dpr=1',
    'https://www.google.com/search?q=B%E1%BA%A1t+ph%E1%BB%A7+xe+3+l%E1%BB%9Bp+tr%C3%A1ng+nh%C3%B4m,+c%C3%A1ch+nhi%E1%BB%87t+ch%E1%BB%91ng+th%E1%BA%A5m+n%C6%B0%E1%BB%9Bc,+b%E1%BA%A3o+v%E1%BB%87+g%C6%B0%C6%A1ng+xe,+gi%E1%BB%AF+xe+nh%C6%B0+m%E1%BB%9Bi.&sca_esv=584176901&rlz=1C1KNTJ_enVN1078VN1078&tbs=vw:d&tbm=shop&sxsrf=AM9HkKll46H7ytyTjJWVUUBemAl6HVWpOQ:1700537227454&ei=iyNcZf2kG9nN2roPvYSE6AE&start=360&sa=N&ved=0ahUKEwi9lvrqktSCAxXZplYBHT0CAR04rAIQ8tMDCIoO&biw=1409&bih=877&dpr=1',
];

urls.forEach((url) => {
    getData('bac', url);
});
