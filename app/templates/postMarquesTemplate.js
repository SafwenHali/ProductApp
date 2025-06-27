exports.postMarqueTemplate =  (marque) => {

  const result = `
  <prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
  <manufacturer>
    <id></id> <!-- Leave empty when creating -->
    <active><![CDATA[1]]></active> <!-- 1 = active, 0 = inactive -->
    <name><![CDATA[${marque}]]></name>

    <date_add><![CDATA[]]></date_add>
    <date_upd><![CDATA[]]></date_upd>

    <description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </description>

    <short_description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </short_description>

    <meta_title>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </meta_title>

    <meta_description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </meta_description>

    <meta_keywords>
      <language id="1"><![CDATA[${marque}]]></language>
      <language id="2"><![CDATA[${marque}]]></language>
    </meta_keywords>

    <associations>
      <addresses>
        <address> 
        </address>
      </addresses>
    </associations>
  </manufacturer>
</prestashop>
`
    
   return result;
  
};



