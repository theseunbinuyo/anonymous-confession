import Confession from '../models/confessionModel.js';

export const getAllConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find()
      .select('title body createdAt')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      count: confessions.length,
      data: confessions
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

export const createConfession = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ 
        success: false,
        message: 'Title and body are required' 
      });
    }

    const confession = await Confession.create({
      title,
      body,
      user: req.user.id
    });

    res.status(201).json({ 
      success: true,
      message: 'Confession posted successfully',
      data: {
        id: confession._id,
        title: confession.title,
        body: confession.body,
        createdAt: confession.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

export const deleteConfession = async (req, res) => {
  try {
    const { id } = req.params;

    const confession = await Confession.findById(id);

    if (!confession) {
      return res.status(404).json({ 
        success: false,
        message: 'Confession not found' 
      });
    }

    if (confession.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'You can only delete your own confessions' 
      });
    }

    await Confession.findByIdAndDelete(id);

    res.json({ 
      success: true,
      message: 'Confession deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

export const getUserConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find({ user: req.user.id })
      .select('title body createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: confessions.length,
      data: confessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};