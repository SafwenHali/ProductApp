const { fetchNavItems } = require('../../services/getNavItems')

exports.getNavMarques = async (req, res) => {
  try {
    const result = await fetchNavItems();
    const marques = Array.from(new Set(result.GetItemsResult.Items.map(i => i["Marque"])));

   res.status(200).json({"Marque" : marques});
 } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}