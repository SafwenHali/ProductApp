const { fetchNavItems } = require('../../services/getNavItems')

exports.getNavItems = async (req, res) => {
  try {
    const result = await fetchNavItems();

   res.status(200).json(result);
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
};

exports.getNavItemsByRef = async (req, res) => {
  try {
  const result = await fetchNavItems(req.params.ref);
  res.json(result);
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
};

exports.getNavRefs = async ( req, res) => {
  try {
    const result = await fetchNavItems();
    const references = result.GetItemsResult.Items.map(i => i["Référence"]);

   res.json({"Referances" : references});
   } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
  }
    