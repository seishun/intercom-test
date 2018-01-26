const assert = require('assert');
const child_process = require('child_process');

function run(input) {
  return child_process.execFileSync('node', ['app.js'], {
    input: input.map(JSON.stringify).join('\n')
  });    
}

describe('program', function() {
  it('should output the names and user ids of matching customers (within 100km)', function() {
    const stdout = run([
      {"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"},
      {"latitude": "51.999447", "user_id": 14, "name": "Helen Cahill", "longitude": "-9.742744"},
    ]);
    assert(stdout.includes("Christina McArdle"));
    assert(stdout.includes("12"));
    assert(!stdout.includes("Helen Cahill"));
    assert(!stdout.includes("14"));
  });

  it('should output the names and user ids sorted by User ID (ascending)', function() {
    const stdout = run([
      {"latitude": "53.1302756", "user_id": 5, "name": "Nora Dempsey", "longitude": "-6.2397222"},
      {"latitude": "53.2451022", "user_id": 4, "name": "Ian Kehoe", "longitude": "-6.238335"}
    ]);
    assert(stdout.indexOf("Nora Dempsey") > stdout.indexOf("Ian Kehoe"));
    assert(stdout.indexOf("5") > stdout.indexOf("4"));
  });
});
