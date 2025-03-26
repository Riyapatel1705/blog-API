const { Post, User } = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

exports.getPosts = async (req, res) => {
    try {
      const { userId } = req.query; // Get userId from query parameters
  
      const whereClause = userId ? { userId } : {}; // Filter only if userId is provided
  
      const posts = await Post.findAll({
        where: whereClause,
        include: [{ model: User, as: "author" }]
      });
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error fetching posts" });
    }
  };
  