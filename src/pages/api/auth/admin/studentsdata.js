import { connectDB } from '../../../../lib/mongodb';

export default async function handler(req, res) {
  // Ensure the database is connected
  const { db } = await connectDB();

  if (req.method === 'POST') {
    try {
      // Destructure and assign default values from the request body
      const { cgpa = null, batch = null, department = null, skills = [], gender = null } = req.body;

      // Initialize the query object
      const query = {};
      console.log(cgpa);
      console.log(gender);

      // Add filters to the query object based on the provided criteria
      if (cgpa !== null) {
        query.cgpa = { $gte: Number(cgpa) };
      }
      if (batch) {
        query.batch = batch;
      }
      if (department) {
        query.department = department;
      }
      if (skills.length > 0) {
        query.skills = { $all: skills };
      }
      if (gender && gender !== 'all') {
        query.gender = gender;
      }

      // Fetch users matching the query criteria
      const students = await db.collection('users').find(query).toArray();
      if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No students found for this query' });
      }

      // Respond with the fetched users
      res.status(200).json({ students });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    // Respond with 405 Method Not Allowed for non-POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
