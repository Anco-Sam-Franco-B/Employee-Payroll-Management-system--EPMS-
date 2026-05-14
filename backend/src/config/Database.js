import mysql from 'mysql2'

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'epms'
})

db.connect(err=>{
    if(err) return console.log('🔴 Database Failed!', err)
    return console.log('🟢 Databse is Running....')
})

export default db