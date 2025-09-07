const { executeQuery } = require("@/services/db/db-connection");

class AuthRepository {
  // Query to find user by username or email
  async findUserByUsername(username) {
    const query = `
      SELECT user_db_id, user_uid, username, full_name, email, password, role_id, role_name, created_at
      FROM users
      WHERE username = $1 OR email = $1
      LIMIT 1
    `;
    const results = await executeQuery(query, [username]);
    return results[0];
  }

  async updateUserProfile(userId, name, email, username) {
    const query = `
      UPDATE users
      SET full_name = $1, email = $2, username = $3
      WHERE user_db_id = $4
      RETURNING user_db_id, user_uid, username, full_name, email, role_id, role_name, created_at
    `;
    const results = await executeQuery(query, [name, email, username, userId]);
    return results[0];
  }

  async updateUserPassword(userId, hashedPassword) {
    const query = `
      UPDATE users
      SET password = $1
      WHERE user_db_id = $2
    `;
    return await executeQuery(query, [hashedPassword, userId]);
  }

  // Save location logs for user
  async logUserLocation(userId, ip, timestamp, location, userAgent) {
    const query = `
      INSERT INTO user_location_logs (user_id, ip_address, created_at, location, user_agent) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    return await executeQuery(query, [
      userId,
      ip,
      timestamp,
      location,
      userAgent,
    ]);
  }
}

module.exports = new AuthRepository();
