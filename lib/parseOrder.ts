export type ParsedOrder = {
  customerName?: string;
  customerPhone?: string;
  orderDate?: string;
  deliveryTime?: string;
  orderType: "delivery" | "pickup";
  deliveryAddress?: string;
  pickupStore?: string;
  cakeSize?: string;
  cakeTheme?: string;
  cakeColor?: string;
  filling: string;
  blessingText?: string;
  candle: string;
  birthdaySet: string;
  flowerRequired: boolean;
  totalPrice?: number;
  paymentStatus?: string;
  missingFields: string[];
  riskNotes: string[];
};

export function parseOrderText(text: string, nickname?: string): ParsedOrder {
  const t = text || "";
  const missingFields: string[] = [];
  const riskNotes: string[] = [];

  const phone = t.match(/(\+?\d[\d\s-]{7,}\d)/)?.[1]?.replace(/\s/g, "");
  const priceMatch = t.match(/(\d{2,6})\s*(บาท|铢|泰铢|thb|THB)?/);
  const sizeMatch = t.match(/(\d+)\s*(寸|inch|英寸|磅|lb|ปอนด์)/i);
  const blessing = t.match(/(?:写|祝福语|ข้อความ|เขียน|text|message)[:：]?\s*([A-Za-z0-9\u4e00-\u9fa5\s!?.\-]+)/i)?.[1]?.trim();

  let orderDate = "";
  if (/今天|today|วันนี้/.test(t)) orderDate = new Date().toISOString();
  else if (/明天|tomorrow|พรุ่งนี้/.test(t)) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    orderDate = d.toISOString();
  } else missingFields.push("订单日期");

  let deliveryAddress = "";
  if (/world\s*house/i.test(t)) deliveryAddress = "World House";
  else {
    const addrMatch = t.match(/(?:地址|地点|送到|ที่ส่ง|location|address)[:：]?\s*([^\n]+)/i);
    deliveryAddress = addrMatch?.[1]?.trim() || "";
  }

  const isPickup = /自提|到店取|pickup|รับเอง/.test(t);
  const orderType = isPickup ? "pickup" : "delivery";

  if (orderType === "delivery" && !deliveryAddress) missingFields.push("配送地址");

  let deliveryTime = "";
  if (/做好就送|เสร็จแล้วส่ง|asap|ASAP/.test(t)) deliveryTime = "做好就送";
  else {
    const timeMatch = t.match(/(\d{1,2}[:：]\d{2}|\d{1,2}\s*(点|โมง|am|pm))/i);
    deliveryTime = timeMatch?.[1] || "做好就送";
  }

  const color =
    /粉|pink|ชมพู/i.test(t) ? "粉色" :
    /蓝|blue|ฟ้า|น้ำเงิน/i.test(t) ? "蓝色" :
    /红|red|แดง/i.test(t) ? "红色" :
    /白|white|ขาว/i.test(t) ? "白色" :
    /金|gold|ทอง/i.test(t) ? "金色" : "";

  const flowerRequired = /花|鲜花|flower|ดอกไม้/.test(t);

  if (!phone) riskNotes.push("未识别到联系电话");
  if (!sizeMatch) missingFields.push("蛋糕尺寸");
  if (!blessing) riskNotes.push("未识别到祝福语，可后续确认");

  return {
    customerName: nickname || "",
    customerPhone: phone,
    orderDate,
    deliveryTime,
    orderType,
    deliveryAddress,
    cakeSize: sizeMatch?.[0] || "",
    cakeTheme: /生日|birthday|วันเกิด/i.test(t) ? "生日蛋糕" : "",
    cakeColor: color,
    filling: "新鲜芒果 + 新鲜火龙果",
    blessingText: blessing || "",
    candle: "默认赠送",
    birthdaySet: "默认赠送",
    flowerRequired,
    totalPrice: priceMatch ? Number(priceMatch[1]) : undefined,
    paymentStatus: /转账|โอน|paid|已付/i.test(t) ? "已转账" : "未付款",
    missingFields,
    riskNotes
  };
}
