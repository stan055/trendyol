function toXml (product) {
let xml = '';

try {
xml = 
`<offers>
    <offer id="${product.id}" groups id="1225" available="true">
    <url>${product.url}</url>
    <price>${product.price}</price>
    <currencyId>UAH</currencyId>
    <categoryId>391</categoryId>
    <rz_group_id>152162011</rz_group_id>
    <rz_id_for_group>16623755</rz_id_for_group>
    <picture>http://abc.ua/upload/iblock/a53/a5391cddb40be91705.jpg</picture>
    <picture>http://abc.ua/upload/iblock/9d0/9d06805d219fb525fc.jpg</picture>
    <picture>http://abc.ua/upload/iblock/93d/93de38537e1cc    1f8f2.jpg</picture>
    <vendor>${product.brand}</vendor>
    <stock_quantity>100</stock_quantity>
    <name>${product.name}</name>
    <description><![CDATA[<p>Одяг<b>Abc clothes</b> сприяє розвитку функцій головного мозку шляхом підтримки дрібної моторики.</p><p>В Abc <b>New Collection</b> буде особливо зручно стрибати, пригати та бігати.</p><p>Завдяки своїй універсальності та багатофункціональності, <b>Abc clothes</b> чудово підійде:</p><ul><li><b>Для весни</b></li><li><b>Для літа</b></li><li><b>Для ранньої осені</b></li></ul><p><b>Склад:</b>• 92% поліестер, 8%еластан, нетоксичність підтверджена в лабораторії.</p><p><b>Вага:</b> 305 г</p>]]></description>
    <param name="Зріст">146 см</param>
    <param name="Сезон">Весна-Осінь</param>
    <param name="Колір">Чорний</param>
    <param name="Особливості моделі">З капюшоном</param>
    <param name="Склад">92% поліестер, 8% еластан</param>
    <param name="Країна-виробник товару">Естонія</param>
    <param name="Артикул">${product.productCode}</param>
</offer>`;

} catch (error) {
    console.log(error);
    throw error;
}

return xml;
}


exports.toXml = toXml;