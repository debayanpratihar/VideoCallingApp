const fs = require('fs');
const path = require('path');

function readDirectory(dir, relativePath = '') {
    const results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results.push({
                type: 'directory',
                name: file,
                path: path.join(relativePath, file),
                contents: readDirectory(filePath, path.join(relativePath, file)),
            });
        } else {
            const summary = getFileSummary(filePath);
            results.push({
                type: 'file',
                name: file,
                path: path.join(relativePath, file),
                summary: summary,
            });
        }
    });
    return results;
}

function getFileSummary(filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const lines = fileContents.split('\n');
    const summaryLines = lines.slice(0, 5); // Get the first 5 lines for summary
    return summaryLines.join('\n');
}

function convertStructureToTxt(structure, indent = 0) {
    let txt = '';
    structure.forEach((item) => {
        txt += '  '.repeat(indent) + (item.type === 'directory' ? '📁 ' : '📄 ') + item.name + '\n';
        if (item.type === 'directory') {
            txt += convertStructureToTxt(item.contents, indent + 1);
        } else if (item.type === 'file') {
            txt += '  '.repeat(indent + 1) + 'Summary:\n';
            txt += '  '.repeat(indent + 1) + item.summary.split('\n').map(line => '  '.repeat(indent + 1) + line).join('\n') + '\n';
        }
    });
    return txt;
}

function saveStructureToTxt(structure, txtFilePath) {
    const txt = convertStructureToTxt(structure);
    fs.writeFileSync(txtFilePath, txt, 'utf8');
}

// Example usage
const projectPath = path.join('D:', 'MY PROJECT', 'NullClass', 'videocall'); // Replace with your project folder path
const outputPath = path.join(__dirname, 'project_structure.txt');

const projectStructure = readDirectory(projectPath);
saveStructureToTxt(projectStructure, outputPath);

console.log(`Project structure successfully written to ${outputPath}`);
