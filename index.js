// 설치한 라이브러리 가져오기
const express = require('express') 
const app = express()
const ejs = require('ejs')
const port = 3000
const mysql      = require('mysql');

// Mysql 연결 객체 생성하기
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0428',
  database : 'klab'
});

// express 서버를 ejs를 쓰기로 설정하기
app.set('ejs', ejs.renderFile)

// '/'라는 주소를 받았을 때 어떻게 대답할 것인지
app.get('/', (request, response) =>{
    // users 테이블의 모든 정보 가져오라는 쿼리문
    const sql = 'SELECT * from users' 
    // 디비에 해당 쿼리문을 날리고 결과를 result로 받아온다
    connection.query(sql, function(error, result, fields){
        if (error) throw error;
        // 에러가 없으면 view.ejs에 users라는 변수에 방금 받은 result를 넣어서 보내준다
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