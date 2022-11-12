//express라이브러리를 가져와서 express라는 변수에 저장
const express = require('express') 

//app이라는 변수에 express 실행
const app = express()
const ejs = require('ejs')

const port = 3000
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0428',
  database : 'klab'
});

app.set('ejs', ejs.renderFile)

app.get('/', (request, response) =>{
    const sql = 'SELECT * from users'
    connection.query(sql, function(error, result, fields){
        if (error) throw error;
        response.render('view.ejs', {users: result})
    })
})

// const sql_test = "INSERT INTO users(name, pwd) values(?,?)"
// connection.query(
//     sql, ['minsu','1113'], function(err, result, fields){
//         if(err) throw err;
//         console.log(result)
//     }
// )

app.listen(port, () => console.log('App is listening on port ',port))

// connection.end();