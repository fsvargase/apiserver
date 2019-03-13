const mysql = require('mysql');

const selectSQL = "SELECT * FROM users ORDER BY id";
const insertSQL = "INSERT INTO users SET ?";


connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kaizen'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        connection.query(selectSQL, (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        })
    }
};

userModel.getUser = (id, callback) => {
    let selectSQLOne = `
    SELECT * FROM  users  WHERE id = ${id}
    `;
    if (connection) {
        connection.query(selectSQLOne, (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        })
    }
};

userModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query(insertSQL, userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            })
    }
}

userModel.updateUser = (userData, callback) => {
    if (connection) {
        //        const updateSQL ="UPDATE users SET username ='"+userData.username+"' WHERE id ="+userData.id;
        const updateSQL = `UPDATE users  
        SET username = ${connection.escape(userData.username)},
        password = ${connection.escape(userData.password)} 
        WHERE id = ${userData.id}
        `;
        connection.query(updateSQL, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    "msg": "success"
                })
            }
        })
    }
}

userModel.deleteUser = (id, callback) => {
    if (connection) {
        let busquedaSQL = `
        SELECT * FROM  users  WHERE id = ${id}
        `;
        connection.query(busquedaSQL, (err, row) => {
            if (row) {
                let deleteSQL = `
                    DELETE FROM users WHERE id = ${id}
                    `;
                    connection.query(deleteSQL, (err, result) => {
                    if (err) {throw err;}
                    else{ callback(null, {msg: "deleted" })}
                    });
            } else {
                callback(null, { msg: "not exist" })
            }
        });
    }
}


module.exports= userModel;