/**
 * Loads portfolio-data.js and app.js exactly as the browser would (via a
 * minimal DOM stub, since app.js wires up event listeners at load time),
 * then checks detectEntity/detectIntent against the regression suite.
 *
 * Usage: node tests/run-router-tests.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const cases = require("./regression-questions");

function fakeElement() {
  const el = {
    hidden: true,
    children: [],
    addEventListener() {},
    setAttribute() {},
    getAttribute() {
      return null;
    },
    focus() {},
    appendChild(child) {
      el.children.push(child);
    },
    set textContent(value) {
      this._text = value;
    },
    get textContent() {
      return this._text || "";
    },
    set innerHTML(value) {
      this._html = value;
    },
    get innerHTML() {
      return this._html || "";
    },
    scrollTop: 0,
    scrollHeight: 0,
    value: ""
  };
  return el;
}

const sandbox = {
  console,
  document: {
    getElementById: () => fakeElement(),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => fakeElement()
  },
  window: { setTimeout: (fn) => fn() },
  setTimeout: (fn) => fn()
};

vm.createContext(sandbox);

const root = path.join(__dirname, "..");
vm.runInContext(fs.readFileSync(path.join(root, "portfolio-data.js"), "utf8"), sandbox, {
  filename: "portfolio-data.js"
});
vm.runInContext(fs.readFileSync(path.join(root, "app.js"), "utf8"), sandbox, { filename: "app.js" });

let passed = 0;
let failed = 0;

for (const testCase of cases) {
  const normalized = testCase.question.toLowerCase().trim();
  const entity = sandbox.detectEntity(normalized);
  const intent = sandbox.detectIntent(normalized);
  const gotEntity = entity ? entity.id : null;

  const entityOK = gotEntity === testCase.entity;
  const intentOK = intent === testCase.intent;

  if (entityOK && intentOK) {
    passed += 1;
  } else {
    failed += 1;
    console.log(`FAIL: "${testCase.question}"`);
    console.log(`  expected entity=${testCase.entity}, intent=${testCase.intent}`);
    console.log(`  got      entity=${gotEntity}, intent=${intent}`);
  }
}

console.log(`\n${passed}/${cases.length} passed`);
if (failed > 0) process.exit(1);
