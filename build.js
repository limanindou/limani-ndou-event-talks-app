
const fs = require('fs');

const talks = JSON.parse(fs.readFileSync('talks.json', 'utf-8'));
const css = fs.readFileSync('style.css', 'utf-8');
let js = fs.readFileSync('script.js', 'utf-8');

// Replace the fetch call with the actual data
js = js.replace("fetch('talks.json').then(response => response.json())", "Promise.resolve(" + JSON.stringify(talks) + ")");


const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Today</title>
    <style>${css}</style>
</head>
<body>
    <header>
        <h1>Tech Talks Today</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search by category...">
        </div>
    </header>
    <main id="schedule">
        <!-- Schedule will be dynamically generated here -->
    </main>
    <script>${js}</script>
</body>
</html>
`;

fs.writeFileSync('dist/index.html', html);
console.log('Website built successfully!');
