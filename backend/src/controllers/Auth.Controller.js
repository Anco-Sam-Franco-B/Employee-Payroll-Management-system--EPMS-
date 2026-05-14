import db from '../config/Database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    try {
        const [data] = await db.promise().query('SELECT * FROM admin WHERE email = ?', [email]);
        if (data.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = data[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1d' }
        );

        // Remove password from user object
        delete user.password;

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: user
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', errorMessage: error.message });
    }
}

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields are required' })

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query('INSERT INTO admin (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', errorMessage: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.user; // From verifyToken middleware
    const { username, email, phone, role, department, location, status, bio } = req.body;

    try {
        const sql = `
            UPDATE admin 
            SET username=?, email=?, phone=?, role=?, department=?, location=?, status=?, bio=? 
            WHERE id=?
        `;
        await db.promise().query(sql, [username, email, phone, role, department, location, status, bio, id]);
        
        const [updatedUser] = await db.promise().query('SELECT * FROM admin WHERE id = ?', [id]);
        delete updatedUser[0].password;

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser[0]
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating profile', errorMessage: error.message });
    }
}

export const changePassword = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old and new passwords are required' });
    }

    try {
        const [data] = await db.promise().query('SELECT password FROM admin WHERE id = ?', [id]);
        const user = data[0];

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect old password' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.promise().query('UPDATE admin SET password = ? WHERE id = ?', [hashedPassword, id]);

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error changing password', errorMessage: error.message });
    }
}

export const updateAvatar = async (req, res) => {
    const { id } = req.user;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    try {
        await db.promise().query('UPDATE admin SET avatar = ? WHERE id = ?', [avatarPath, id]);
        return res.status(200).json({ 
            message: 'Avatar updated successfully', 
            avatar: avatarPath 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating avatar', errorMessage: error.message });
    }
}
