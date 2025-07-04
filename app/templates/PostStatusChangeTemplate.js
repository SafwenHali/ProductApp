exports.PostStatusChangeTemplate =  (id,status) => {
    
  const result = `
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
  <order_history>
    <id_order><![CDATA[${id}]]></id_order>
    <id_order_state><![CDATA[${status}]]></id_order_state>
  </order_history>
</prestashop>`
    
   return result;
  
};