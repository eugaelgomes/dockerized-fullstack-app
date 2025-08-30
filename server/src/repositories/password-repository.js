const { executeQuery } = require("@/services/db/db-connection");

class PasswordRepository {
  // Query to find user by email to rescue password action
async findUserByEmail(email) {
  const query = "SELECT user_db_id, user_uid, email FROM users WHERE LOWER(email) = LOWER($1)";
  const results = await executeQuery(query, [email]);
  return results[0];
}


  // Deactivate old tokens for user
  async deactivateOldTokens(userId) {
    const query =
      "UPDATE tokens SET active = FALSE WHERE user_id = $1 AND active = TRUE";
    return await executeQuery(query, [userId]);
  }

  // Create a new token for user who forgot password action
  async createToken(userId, token, createdAt) {
    const query =
      "INSERT INTO tokens (user_id, token, type, expires_at, created_at, active) VALUES ($1, $2, 'password_reset', ($3::timestamp + interval '1 day'), $3, TRUE)";
    return await executeQuery(query, [userId, token, createdAt]);
  }

  // Find token by its value
  async findTokenByValue(token) {
    const query = "SELECT * FROM tokens WHERE token = $1 AND active = TRUE AND type = 'password_reset' AND expires_at > NOW()";
    const results = await executeQuery(query, [token]);
    return results[0];
  }

  // Find user by ID
  async findUserById(userId) {
    const query = "SELECT user_db_id, email FROM users WHERE user_db_id = $1";
    const results = await executeQuery(query, [userId]);
    return results[0];
  }

  // Update user password if token is valid
  async updateUserPassword(userId, hashedPassword) {
    const query = "UPDATE users SET password = $1 WHERE user_db_id = $2";
    return await executeQuery(query, [hashedPassword, userId]);
  }

  // Deactivate token after use
  async deactivateToken(token) {
    const query = "UPDATE tokens SET active = FALSE WHERE token = $1";
    return await executeQuery(query, [token]);
  }
}

module.exports = new PasswordRepository();
