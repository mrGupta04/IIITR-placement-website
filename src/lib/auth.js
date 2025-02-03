import jwt from 'jsonwebtoken';

export function authenticate(handler) {
  return async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token missing or invalid' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user info to the request
      req.user = decoded;

      // Proceed to the actual API route handler
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}
