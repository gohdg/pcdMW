const db = require('../config/db');

class Post {
    constructor(clientID, clientSecret){
        this.clientID = clientID;
        this.clientSecret = clientSecret;
    }

    save(){
        let sql = `
        INSERT INTO tvserver(
            clientId,
            clientSecret
        )
        VALUES(
            '${this.clientID}',
            '${this.clientSecret}'
        )
        `;
        return db.execute(sql);
    }

    update(){
        let sql = `
        UPDATE tvserver 
        SET 
        clientID ='${this.clientID}',
        clientSecret = '${this.clientSecret}'              
        `;
        return db.execute(sql);
        

    }

    deleteSub(id){
        let sql = `DELETE FROM subscriptions WHERE id = '${id}'`;
        return db.execute(sql);
    }

    updateSub(id,name, callbackUri, updated, callbackToken=''){
        let sql = `
        UPDATE subscriptions
        SET
        name = '${name}',
        callbackUri = '${callbackUri}',
        callbackToken = '${callbackToken}',
        updated = '${updated}'
        WHERE
        id = ${id}
        `;
        //console.log(sql);
        return db.execute(sql);
    }

    saveSub(name, callbackUri, created){
        let sql = `
        INSERT INTO subscriptions(
            name,
            callbackUri,            
            created
        )
        VALUES(
            '${name}',
            '${callbackUri}',
            '${created}'
        )
        `;
        //console.log(sql);

        return db.execute(sql);
    }

    static findAll(){
        let sql =`SELECT * FROM tvserver `;
        return db.execute(sql);

    }

    static findAllSub(){
        let sql =`SELECT id, name, callbackUri, created FROM subscriptions order by id desc limit 1`;
        console.log(sql);
        return db.execute(sql);
    }

    static findSubById(id){
        let sql = `SELECT id, name, callbackUri, created FROM subscriptions WHERE id= ${id}`;
        return db.execute(sql);
    }
    static findSubUpdatedById(id){
        let sql = `SELECT id, name, created, updated, callbackUri FROM subscriptions WHERE id= ${id}`;
        return db.execute(sql);
    }
    static findRoomById(roomno){
        let sql = `
        SELECT roomno, guestid, status, firstname, lastname, title, language, vip FROM roominfo
        WHERE roomno = '${roomno}'
        `;
        return db.execute(sql);
    }

   
}

module.exports = Post;