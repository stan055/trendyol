function toXml (product) {
let xml = '';

try {
    let attributesStr = product.attributes.map(e => {
        atrStr = `<p><b>${e.key.name}</b>: ${e.value.name}</p>` 
        return atrStr;
      }).toString();

      const webColor = product.attributes.find(({ key }) => key.name === "Web Color");
      const material = product.attributes.find(({ key }) => key.name === "Material");
xml = 
`<offers>
    <offer id="${product.id}" groups id="1225" available="true">
    <url>${product.url}</url>
    <price>${product.price.sellingPrice}</price>
    <currencyId>${product.price.currency}</currencyId>
    <categoryId>391</categoryId>
    <rz_group_id>152162011</rz_group_id>
    <rz_id_for_group>16623755</rz_id_for_group>
    <picture>http://abc.ua/upload/iblock/a53/a5391cddb40be91705.jpg</picture>
    <picture>http://abc.ua/upload/iblock/9d0/9d06805d219fb525fc.jpg</picture>
    <picture>http://abc.ua/upload/iblock/93d/93de38537e1cc    1f8f2.jpg</picture>
    <vendor>${product.brand}</vendor>
    <stock_quantity>100</stock_quantity>
    <name>${product.name}</name>
    <description><![CDATA[
        ${attributesStr}
    ]]></description>
    <param name="Зріст">146 см</param>
    <param name="Сезон">Весна-Осінь</param>
    <param name="Колір">${webColor.value.name ?? ''}</param>
    <param name="Особливості моделі">З капюшоном</param>
    <param name="Склад">${material.value.name ?? ''}</param>
    <param name="Країна-виробник товару">Країна-виробник товару</param>
    <param name="Артикул">${product.productCode}</param>
</offer>`;

} catch (error) {
    console.log(error);
    throw error;
}

return xml;
}


exports.toXml = toXml;