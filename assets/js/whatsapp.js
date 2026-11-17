export function whatsappUrl(number, message) {
  const clean = String(number || '').replace(/\D/g, '');
  if (!/^\d{8,15}$/.test(clean)) throw new Error('Invalid WhatsApp number.');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
export function serviceMessage(service, settings, quantity = service.min_quantity) {
  const price = `${settings.currency} ${Number(service.price).toLocaleString()}`;
  return `Hello BH Digital Services!\n\nI want information about this service:\n\nService: ${service.name}\nSample price: ${price} ${service.price_unit}\nQuantity: ${quantity}\n\n${service.whatsapp_message}\n\nPlease confirm availability, final price and details.\n\nWebsite: ${settings.website}`;
}
