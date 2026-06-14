const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Backend Running');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        const connection = await db.getConnection();

        console.log('✅ MySQL Connected Successfully');

        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Server executing securely on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ MySQL Connection Failed');
        console.error(error.message);
    }
}

startServer();