import path from 'path';
import {correct, StageTest, wrong} from 'hs-test-web';

const pagePath = path.join(import.meta.url, '../../src/index.html');

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [this.page.execute(() => {
        // test #1
        // HELPERS-->
        // method to check if element with id exists
        this.elementExists = (id, nodeNames) => {
            const element = document.body.querySelector(id);
            if (!element) return true;
            else return (nodeNames && !nodeNames.includes(element.nodeName.toLowerCase()));
        };

        // method to check if element with id has right text
        this.elementHasText = (id, correctText) => {
            const element = document.body.querySelector(id);
            if (!element) return true;

            if (correctText) {
                return (element.innerText !== correctText);
            }

            return !element.innerText || element.innerText.trim().length === 0;
        };

        // method to check the style of the element with id
        this.elementStyle = (id, style, value, strict=true) => {
            const element = document.body.querySelector(id);
            if (!element) return true;
            const styleValue = getComputedStyle(element)[style];
            // console.log(styleValue);
            if (!strict) return !styleValue.includes(value);
            return styleValue !== value;
        };


        // CONSTANTS-->
        const theElement = "The element with the selector of";

        this.bgColors = [
            "rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
            "rgb(0, 255, 255)", "rgb(0, 0, 255)", "rgb(255, 0, 255)",
        ];
        // <--CONSTANTS

        // MESSAGES-->
        this.missingIdMsg = (id) => {
            return `${theElement} "${id}" is missing in the body of the HTML document.`;
        };
        this.wrongTagMsg = (id, tag, tagAlt) => {
            if (tagAlt) return `${theElement} "${id}" should be a/an ${tag} or ${tagAlt} tag.`;
            else return `${theElement} "${id}" should be a/an ${tag} tag.`;
        };
        this.wrongTextMsg = (id, text) => {
            return `${theElement} "${id}" should have the text: "${text}".`;
        };
        // <--MESSAGES
        return correct();

    }), this.page.execute(async () => {
        // test #2
        // STAGE1 TAGS

        // check if h1 exists
        const h1 = "h1";
        if (this.elementExists(h1)) return wrong(this.missingIdMsg(h1));

        // check if correct text
        const h1Text = "Color Guess Game";
        if (this.elementHasText(h1, h1Text)) return wrong(this.wrongTextMsg(h1, h1Text));

        // check #rgb exists
        const rgb = "#rgb-color";
        if (this.elementExists(rgb)) return wrong(this.missingIdMsg(rgb));

        // check if its p tag
        if (this.elementExists(rgb, ["p"])) return wrong(this.wrongTagMsg(rgb, "p"));

        // check if it has text
        const rgbText = "RGB(255, 0, 0)";
        if (this.elementHasText(rgb, rgbText)) return wrong(this.wrongTextMsg(rgb, rgbText));

        // check if #status exists
        const status = "#status";
        if (this.elementExists(status)) return wrong(this.missingIdMsg(status));

        // check if its p tag
        if (this.elementExists(status, ["p"])) return wrong(this.wrongTagMsg(status, "p"));

        // check if it has text
        const statusText = "Start Guessing!";
        if (this.elementHasText(status, statusText)) return wrong(this.wrongTextMsg(status, statusText));

        // check if #restart exists
        const restart = "#restart";
        if (this.elementExists(restart)) return wrong(this.missingIdMsg(restart));

        // check if its button
        if (this.elementExists(restart, ["button"])) return wrong(this.wrongTagMsg(restart, "button"));

        // check if it has text
        const restartText = "Restart";
        if (this.elementHasText(restart, restartText))
            return wrong(this.wrongTextMsg(restart, restartText));

        // check divs are 6
        const colorBlock = ".color-block";
        const colorBlocks = document.body.querySelectorAll(colorBlock);
        if (colorBlocks.length !== 6) return wrong("There should be 6 color blocks(divs).");

        // check if all color-block are divs
        for (let i = 0; i < colorBlocks.length; i++) {
            if (colorBlocks[i].nodeName.toLowerCase() !== "div") {
                return wrong(`All color blocks should be divs.`);
            }
        }

        return correct();

    }), this.page.execute(async () => {
        // test #3
        // STAGE1 COLOR BLOCKS

        // check if all color-blocks has correct bg-color
        let numBlocks = 6;
        for (let i = 1; i <= numBlocks; i++) {
            let colorBlock = `.color-block:nth-of-type(${i})`;

            const colorBlockElement = document.body.querySelector(colorBlock);
            if (!colorBlockElement) return wrong(this.missingIdMsg(colorBlock));

            if (this.elementStyle(colorBlock, "backgroundColor", this.bgColors[i - 1])) {
                return wrong(`The color-block with the selector of "${colorBlock}" should have the background color of ${this.bgColors[i - 1]}.`);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 3000));

        return correct();
    })
    ]

}

it("Test stage", async () => {
    await new Test().runTests()
}).timeout(30000);