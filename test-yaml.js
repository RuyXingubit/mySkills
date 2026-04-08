import fs from 'fs';
import path from 'path';

function checkDir(dir) {
  let files = fs.readdirSync(dir, { withFileTypes: true });
  for (let f of files) {
    let full = path.join(dir, f.name);
    if (f.isDirectory()) {
      checkDir(full);
    } else if (f.name.endsWith('.md')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.startsWith('---')) {
        let closing = content.indexOf('\n---', 3);
        if (closing === -1) {
          console.log('Error: No closing --- in', full);
        } else {
           // extract
           let yamlStr = content.substring(4, closing);
           // check if there's another block immediately following
           let rest = content.substring(closing + 4).trimStart();
           if (rest.startsWith('---')) {
             console.log('Error: Duplicate frontmatter block in', full);
           }
        }
      }
    }
  }
}

checkDir('.agent');
console.log('Done checking.');
