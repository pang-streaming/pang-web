
export function formattedPrice(price: number | string) {
    const num = typeof price === "string" ? parseInt(price.replace(/[^0-9]/g, "")) : price;
    return Number(num).toLocaleString("ko-KR");
  }