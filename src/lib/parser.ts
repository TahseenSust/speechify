/**
 * List of HTML tags that we want to ignore when finding the top level readable elements
 * These elements should not be chosen while rendering the hover player
 */
const IGNORE_LIST = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BUTTON",
  "LABEL",
  "SPAN",
  "IMG",
  "PRE",
  "SCRIPT",
];

/**
 *  **TBD:**
 *  Implement a function that returns all the top level readable elements on the page, keeping in mind the ignore list.
 *  Start Parsing inside the body element of the HTMLPage.
 *  A top level readable element is defined as follows:
 *      1. The text node contained in the element should not be empty
 *      2. The element should not be in the ignore list
 *      3. The element should not be a child of another element that has only one child.
 *            For example: <div><blockquote>Some text here</blockquote></div>. div is the top level readable element and not blockquote
 *      4. A top level readable element should not contain another top level readable element.
 *            For example: Consider the following HTML document:
 *            <body>
 *              <div id="root"></div>
 *              <div id="content-1">
 *                <article>
 *                  <header>
 *                    <h1 id="title">An Interesting HTML Document</h1>
 *                    <span>
 *                      <address id="test">John Doe</address>
 *                    </span>
 *                  </header>
 *                  <section></section>
 *                </article>
 *              </div>
 *            </body>;
 *            In this case, #content-1 should not be considered as a top level readable element.
 */

export function getTopLevelReadableElementsOnPage() {
  const readableElements = [];

  // get all top-level elements on the page
  const topLevelElements = document.body;

  return traverseAllElement(topLevelElements);

  // console.log({ topLevelElements });

  // topLevelElements.forEach((element) => {
  //   // check if the element is not in the blocklist
  //   if (!IGNORE_LIST.includes(element.tagName)) {
  //     // check if the element has a text node descendant
  //     // const textNode = element.querySelector(":scope > *:nth-last-child(n)"); // get the last text node descendant
  //     // if (textNode && textNode.textContent.trim() !== "") {
  //     //   readableElements.push(element);
  //     // }
  //     if(Array.from(element.children).length===0){
  //       readableElements.push(element)
  //     }else{

  //     }
  //   }
  // });

  return readableElements;
}

function traverseAllElement(elements: Element) {
  const readableElements: Element[] = [];

  // get all top-level elements on the page
  const topLevelElements = Array.from(elements.children);

  topLevelElements.forEach((element) => {
    // check if the element is not in the blocklist
    if (!IGNORE_LIST.includes(element.tagName)) {
      if (
        Array.from(element.children).length <= 1 &&
        element.textContent !== null &&
        element.textContent.trim() !== ""
      ) {
        readableElements.push(element);
      } else {
        const readableElementsFromChild = traverseAllElement(element);
        for (const ele of readableElementsFromChild) {
          readableElements.push(ele);
        }
      }
    }
  });

  return readableElements;
}
