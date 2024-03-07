import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
})

export const mysqlDBConnect = async () => {
    try {
        connection.connect((err) => {
            if (err) {
                console.error('Error in connecting to MySQL database:', err)
                return
            }
            console.log('Connected to Jamille database! 🐄')
        })
    } catch (error) {
        console.error('Error in connecting to MySQL database:', error)
    }
}