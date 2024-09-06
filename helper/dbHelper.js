// import mysql from 'mysql'

// const connectionOption = mysql.createConnection({
//     host: "127.0.0.1",
//     port: "3306",
//     user: "TestManagement",
//     password: "DevUser123!#",
//     database: "test_management"
// });

// connectionOption.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// export async function queryabc(queryString) 
// {
//     connectionOption.query(queryString, async function (err, result, fields) {
//         if (err) throw err;
//         return await result;
//     });
// }