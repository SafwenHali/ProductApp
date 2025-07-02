exports.postProductTemplate =  (product) => {

/*              "Référence": "1421068",
                "Name": "PERCEUSE A COLONNE TR16RB",
                "Prix": "1247.14",
                "Prix_Vente": "1122.426",
                "Prix_Promotionnel": "1122.426",
                "Catégorie": "EQUIPEMENT INDUSTRIEL",
                "Sous_Catégorie": "MATERIEL DE SERVICE",
                "Marque": "VALEX"*/

const reference             = product?.reference             
const name                  = product?.name                  

const price                 = product?.price                 
const saleprice             = product?.saleprice             

const category              = product?.category             
const subcategory           = product?.subcategory           
const id_manufacturer       = product?.id_manufacturer       


  const result = `<?xml version="1.0" encoding="UTF-8"?>
<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">L
  <product>
    <id_manufacturer><![CDATA[${id_manufacturer}]]></id_manufacturer>
    <id_supplier><![CDATA[0]]></id_supplier>
    <id_category_default><![CDATA[${category}]]></id_category_default>
    <new><![CDATA[1]]></new>
    <cache_default_attribute><![CDATA[0]]></cache_default_attribute>
    <id_default_image><![CDATA[0]]></id_default_image>
    <id_default_combination><![CDATA[0]]></id_default_combination>
    <id_tax_rules_group><![CDATA[1]]></id_tax_rules_group>
    <type><![CDATA[standard]]></type>
    <id_shop_default><![CDATA[1]]></id_shop_default>
    <reference><![CDATA[${reference}]]></reference>
    <supplier_reference><![CDATA[]]></supplier_reference>
    <location><![CDATA[A1-R1]]></location>
    <width><![CDATA[0]]></width>
    <height><![CDATA[0]]></height>
    <depth><![CDATA[0]]></depth>
    <weight><![CDATA[0]]></weight>
    <quantity_discount><![CDATA[0]]></quantity_discount>
    <ean13><![CDATA[]]></ean13>
    <isbn><![CDATA[]]></isbn>
    <upc><![CDATA[]]></upc>
    <mpn><![CDATA[]]></mpn>
    <cache_is_pack><![CDATA[0]]></cache_is_pack>
    <cache_has_attachments><![CDATA[0]]></cache_has_attachments>
    <is_virtual><![CDATA[0]]></is_virtual>
    <state><![CDATA[1]]></state>
    <additional_delivery_times><![CDATA[1]]></additional_delivery_times>
    <delivery_in_stock>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </delivery_in_stock>
    <delivery_out_stock>
      <language id="1"><![CDATA[Out of stock]]></language>
      <language id="2"><![CDATA[Rupture de stock]]></language>
    </delivery_out_stock>
    <product_type><![CDATA[standard]]></product_type>
    <on_sale><![CDATA[1]]></on_sale>
    <online_only><![CDATA[0]]></online_only>
    <ecotax><![CDATA[0.00]]></ecotax>
    <minimal_quantity><![CDATA[1]]></minimal_quantity>
    <low_stock_threshold><![CDATA[5]]></low_stock_threshold>
    <low_stock_alert><![CDATA[0]]></low_stock_alert>
    <price><![CDATA[${saleprice}]]></price>
    <wholesale_price><![CDATA[${price}]]></wholesale_price>
    <unity><![CDATA[]]></unity>
    <unit_price><![CDATA[0]]></unit_price>
    <unit_price_ratio><![CDATA[1.0]]></unit_price_ratio>
    <additional_shipping_cost><![CDATA[0.00]]></additional_shipping_cost>
    <customizable><![CDATA[0]]></customizable>
    <text_fields><![CDATA[0]]></text_fields>
    <uploadable_files><![CDATA[0]]></uploadable_files>
    <active><![CDATA[0]]></active>
    <redirect_type><![CDATA[404]]></redirect_type>
    <id_type_redirected><![CDATA[0]]></id_type_redirected>
    <available_for_order><![CDATA[1]]></available_for_order>
    <available_date><![CDATA[]]></available_date>
    <show_condition><![CDATA[1]]></show_condition>
    <condition><![CDATA[new]]></condition>
    <show_price><![CDATA[1]]></show_price>
    <indexed><![CDATA[1]]></indexed>
    <visibility><![CDATA[both]]></visibility>
    <advanced_stock_management><![CDATA[0]]></advanced_stock_management>
    <date_add><![CDATA[]]></date_add>
    <date_upd><![CDATA[]]></date_upd>
    <pack_stock_type><![CDATA[3]]></pack_stock_type>

    <meta_description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </meta_description>
    <meta_keywords>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </meta_keywords>
    <meta_title>
      <language id="1"><![CDATA[${name}]]></language>
      <language id="2"><![CDATA[${name}]]></language>
    </meta_title>
    <link_rewrite>
      <language id="1"><![CDATA[${name}]]></language>
      <language id="2"><![CDATA[${name}]]></language>
    </link_rewrite>
    <name>
      <language id="1"><![CDATA[${name}]]></language>
      <language id="2"><![CDATA[${name}]]></language>
    </name>
    <description>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </description>
    <description_short>
      <language id="1"><![CDATA[]]></language>
      <language id="2"><![CDATA[]]></language>
    </description_short>
    <available_now>
      <language id="1"><![CDATA[In Stock]]></language>
      <language id="2"><![CDATA[En Stock]]></language>
    </available_now>
    <available_later>
      <language id="1"><![CDATA[Available later]]></language>
      <language id="2"><![CDATA[Disponible plus tard]]></language>
    </available_later>

    <associations>
      <categories>
      <category>
          <id><![CDATA[${category}]]></id>
        </category>
        <category>
          <id><![CDATA[${subcategory}]]></id>
        </category>
      </categories>
    </associations>
  </product>
</prestashop>`
    
   return result;
  
};