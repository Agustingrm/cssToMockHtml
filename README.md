## Usage

Install the package with

`npm install mock-html-from-css`

Then it can be used globally with the following command

```
import { mockHtmlFromCss } from 'mock-html-from-css';

mockHtmlFromCss('div.#someRandomId.class1.class2 > span[value="open"]')

```

Which will return the following code as an HTML element. The parent element defaults to a div, unless specified

```
<div>
    <div class="class1 class2" id="someRandomId">
        <span value="open"></span>
    </div>
</div>
```
