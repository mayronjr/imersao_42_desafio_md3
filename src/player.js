
function verifyType(v, t) {
    var vn = Object.keys(v)[0]
    if(typeof t === 'object'){
        var correctType = false, tmessage = ''
        for(let i in t){
            if(tmessage.length === 0){
                tmessage = t[i]
            }else{
                tmessage += ' or a ' + t[i]
            }
            correctType = correctType || typeof v[vn] === t[i]
        }
        if(!correctType){
            throw Error(vn + ' should be a '+tmessage+', instead received a ' +  typeof v[vn])
        }
    }else{
        if(typeof v[vn] !== t){
            throw Error(vn + ' should be a String, instead received a ' +  typeof v[vn])
        }
    }
}

class Player {
    constructor(id, name) {
        verifyType({id}, ['number', 'string'])
        verifyType({name}, 'string')
        this.id = id
        this.name = name
        this.old_nicks = []
        this.inventory = []
    }

    addItem(name, time){
        verifyType({name}, 'string')
        verifyType({time}, 'string')
        
        this.inventory.push({name, time})
        return true
    }

    resetInventory(){
        this.inventory = []
    }

    getInventory(){
        return this.inventory
    }

    getId(){
        return this.id
    }

    changeName(newName){
        verifyType({newName}, 'string')
        this.old_nicks.push(this.name)
        this.name = newName
        return true
    }

    getPlayerObject() {
        let {name, id, old_nicks, inventory} = this
        let invNames = []
        for(let i in inventory){
            invNames.push(inventory[i].name)
        }
        return {
            name,
            id,
            old_nicks,
            inventory
        }
    }
}

module.exports = Player