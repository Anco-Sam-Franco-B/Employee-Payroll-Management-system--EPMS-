import db from '../config/Database.js'

const migrate = async () => {
    try {
        console.log('--- Migration Started ---');
        
        const queries = [
            `ALTER TABLE admin 
             ADD COLUMN phone VARCHAR(20),
             ADD COLUMN role VARCHAR(50) DEFAULT 'Super Admin',
             ADD COLUMN department VARCHAR(100),
             ADD COLUMN location VARCHAR(255),
             ADD COLUMN status VARCHAR(20) DEFAULT 'Active',
             ADD COLUMN bio TEXT;`
        ];

        for (const sql of queries) {
            try {
                await db.promise().query(sql);
                console.log('✅ Column added successfully');
            } catch (err) {
                if (err.code === 'ER_DUP_COLUMN_NAME') {
                    console.log('ℹ️ Column already exists, skipping...');
                } else {
                    throw err;
                }
            }
        }

        console.log('--- Migration Completed Successfully ---');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration Failed:', error);
        process.exit(1);
    }
}

migrate();
