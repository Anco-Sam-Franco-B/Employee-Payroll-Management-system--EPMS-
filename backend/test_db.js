import db from './src/config/Database.js'
import bcrypt from 'bcryptjs'

async function test() {
    try {
        console.log("Connecting to db...");
        const [data] = await db.promise().query('SELECT * FROM admin');
        console.log("Data:", data);
        db.end();
    } catch (e) {
        console.error("DB Error:", e.message);
        db.end();
    }
}
test();
