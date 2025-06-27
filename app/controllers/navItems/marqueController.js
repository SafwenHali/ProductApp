const { getMarques } = require('../../services/getNavItems')

exports.getNavMarques = async (req, res) => {
  try {
    const marques = await getMarques();

   res.status(200).json({"Marque" : marques});
 } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}