const fs = require('fs');
const exec = require('child_process').exec;
const component = process.argv[2];

const dir = './src/assets/sass/components/';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.readFile("./src/components/template.html", "utf8", (err, source) => {
    if (err) return console.error(err);
    const content = source.replace(/COMPONENT_NAME/g, component);
    if (fs.existsSync(`./src/components/${component}.html`)) {
        return console.error(`${component}.html already exists, use another name`);
    }
    fs.writeFile(`./src/components/${component}.html`, content, (err) => {
        if (err) return console.error(`There is a problem in creating ${component}.html:`, err);
        else {
            fs.writeFile(`${dir}${component}.scss`, '', (err) => {
                if (err) return console.error(`There is a problem in creating ${component}.scss:`, err);
                console.log(`${component} created successfully!`);
                fs.appendFile(`${dir}_components.scss`, `@import "${component}";\n`, (err) => {
                    if (err) return console.error(`There is a problem in appending ${component}.scss:`, err);
                    console.log(`${component} appended successfully!`);
                    exec(`code -r ./src/components/${component}.html`, (err) => {
                        if (err) return console.error(err);
                    });
                    exec(`code -r ${dir}${component}.scss`, (err) => {
                        if (err) return console.error(err);
                    });
                });
            });
        }
    });
});
