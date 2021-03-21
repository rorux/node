const fs = require('fs');

module.exports = async (fileUrl, data) => {
    try {
        const old = await fs.readFileSync(fileUrl, 'utf-8');
        await fs.writeFileSync(fileUrl, `${ old }\n${ data }`);
        return true;
    }
    catch(err) {
        console.log('Can not write file!');
        return false;
    }
}