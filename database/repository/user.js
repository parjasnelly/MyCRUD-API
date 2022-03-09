const User = require('../../model/user')

class UserRepository{

    insert(user){
        return User.create({...user})
    }

    update(user, id){
        return User.update({...user}, { where: { id: id }})
    }

    delete(id){
        return User.destroy({ where: { id: id }})
    }

    find(id){
        return User.findAll({ where: { id: id }})
    }

    findAll(){
        return User.findAll()
    }
}

module.exports = UserRepository