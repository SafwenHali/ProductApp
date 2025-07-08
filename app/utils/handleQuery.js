const db = require('../config/dbConnect')

exports.handleSQL = async (query) => {
 try {
     let conn;
  try {
    conn = await db.getConnection();
    const [rows] = await conn.query(query);
    return rows
  } catch (err) {
    console.error("Query error:", err);
  } finally {
    if (conn) conn.release();
  }
   } catch (err) {
     console.error('DB handle query error:', err.message);
     return [];
   }
 };
