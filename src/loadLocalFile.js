let readFileSync = require('fs').readFileSync

module.exports = (path) => {
    try{
        return readFileSync(path).toString()
    }catch(err){
        return err
    }
}
