exports.postCategoryTemplate =  (category) => {

const name = category?.name                  ?? '';
const parent  = category?.parent                  ?? 1;


  const result = `
  <prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
  <category>
    <id><![CDATA[]]></id>
    <id_parent><![CDATA[${parent}]]></id_parent> <!-- 1 = root ; 2 = home -->
    <active><![CDATA[1]]></active>
    <id_shop_default><![CDATA[1]]></id_shop_default>
    <is_root_category><![CDATA[0]]></is_root_category>
    <position><![CDATA[0]]></position>
    <date_add><![CDATA[]]></date_add>
    <date_upd><![CDATA[]]></date_upd>

    <name>
      <language id="1"><![CDATA[${name}]]></language>
      <language id="2"><![CDATA[${name}]]></language>
    </name>

    <link_rewrite>
      <language id="1"><![CDATA[${name}]]></language>
      <language id="2"><![CDATA[${name}]]></language>
    </link_rewrite>

    <description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </description>

    <additional_description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </additional_description>

    <meta_title>
      <language id="1"><![CDATA[${name}]]></language>
      <language id="2"><![CDATA[${name}]]></language>
    </meta_title>

    <meta_description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </meta_description>

    <meta_keywords>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </meta_keywords>

    <associations>
      <categories>
        <category>
          <id><![CDATA[]]></id> <!-- Optional: associate with "Home" -->
        </category>
      </categories>
      <products/>
    </associations>
  </category>
</prestashop>
`
    
   return result;
  
};