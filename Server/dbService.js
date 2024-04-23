const mysql = require('mysql')
let instance = null


//Creates the connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthyGators',
    port: 3306
});


connection.connect(err => {
    if(err){
        throw err
    }
    console.log('MySQL Connected')
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM recipe";

                connection.query(query, (err, results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            console.log(response);
            return response;
        } catch(error){
            console.log(error);
        }
    }

    async searchT(tag){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = `SELECT * FROM recipe WHERE ${tag} = 1;`;
                    connection.query(query, (err, results)=>{
                        if(err) reject(new Error(err.message));
                        resolve(results);
                    })
            });

            console.log(response);
            return response;
        } catch(error){
            console.log(error);
        }
    }

    async searchN(name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM recipe WHERE name = ?;";
                    connection.query(query, [name], (err, results)=>{
                        if(err) reject(new Error(err.message));
                        resolve(results);
                    })
            });

            console.log(response);
            return response;
        } catch(error){
            console.log(error);
        }
    }

    async searchB(name, tag){
        try{
            const response = await new Promise((resolve, reject)=>{
                    const query = `SELECT * FROM recipe WHERE name = ? AND ${tag} = 1;`;
                    connection.query(query, [name], (err, results)=>{
                        if(err) reject(new Error(err.message));
                        resolve(results);
                    })
            });

            console.log(response);
            return response;
        } catch(error){
            console.log(error);
        }
    }
}

module.exports = DbService;