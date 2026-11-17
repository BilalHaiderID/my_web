const required = ['id','name','category','description','price','price_unit','min_quantity','max_quantity','available','featured','icon','sort_order','whatsapp_message'];
const icons = new Set(['social','calendar','youtube','design','logo','video','globe','message','vehicle','licence','spark','web','phone']);
const error = (file, field, message, service_id = '') => ({file, ...(service_id ? {service_id} : {}), field, message});

export function validateData({settings, categories, services, faqs}) {
  const errors = [], warnings = [];
  if (!settings || typeof settings !== 'object') errors.push(error('settings.json', 'root', 'Settings must be an object.'));
  else {
    ['business_name','website','whatsapp_number','email','currency'].forEach(key => { if (typeof settings[key] !== 'string' || !settings[key].trim()) errors.push(error('settings.json', key, 'Required non-empty string is missing.')); });
    if (settings.whatsapp_number && !/^\d{8,15}$/.test(settings.whatsapp_number)) errors.push(error('settings.json', 'whatsapp_number', 'Must contain 8–15 digits only.'));
    if (settings.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) errors.push(error('settings.json', 'email', 'Must be a valid email address.'));
    if (settings.website && !/^https:\/\//i.test(settings.website)) warnings.push(error('settings.json', 'website', 'Website should use HTTPS.'));
  }
  const categoryList = categories?.categories;
  if (!Array.isArray(categoryList)) errors.push(error('categories.json', 'categories', 'Categories must be an array.'));
  const categoryIds = new Set();
  categoryList?.forEach((cat, i) => {
    if (!cat || typeof cat !== 'object') return errors.push(error('categories.json', `categories[${i}]`, 'Category must be an object.'));
    if (!cat.id || !cat.name) errors.push(error('categories.json', `categories[${i}]`, 'Category requires id and name.'));
    if (categoryIds.has(cat.id)) errors.push(error('categories.json', 'id', 'Duplicate category ID.', cat.id));
    categoryIds.add(cat.id);
  });
  const list = services?.services;
  if (!Array.isArray(list)) errors.push(error('services.json', 'services', 'Services must be an array.'));
  const serviceIds = new Set();
  list?.forEach((service, i) => {
    const id = service?.id || `index-${i}`;
    required.forEach(key => { if (!(key in (service || {}))) errors.push(error('services.json', key, 'Required property is missing.', id)); });
    if (serviceIds.has(service?.id)) errors.push(error('services.json', 'id', 'Duplicate service ID.', id));
    serviceIds.add(service?.id);
    if (typeof service?.name !== 'string' || !service.name.trim()) errors.push(error('services.json', 'name', 'Service name cannot be empty.', id));
    if (typeof service?.description !== 'string' || !service.description.trim()) errors.push(error('services.json', 'description', 'Description cannot be empty.', id));
    if (typeof service?.price !== 'number' || !Number.isFinite(service.price) || service.price < 0) errors.push(error('services.json', 'price', 'Price must be a non-negative number.', id));
    if (typeof service?.available !== 'boolean') errors.push(error('services.json', 'available', 'Availability must be true or false.', id));
    if (!Number.isInteger(service?.min_quantity) || !Number.isInteger(service?.max_quantity) || service.min_quantity < 1 || service.max_quantity < service.min_quantity) errors.push(error('services.json', 'quantity', 'Quantity range is invalid.', id));
    if (!categoryIds.has(service?.category)) errors.push(error('services.json', 'category', 'Category reference does not exist.', id));
    if (!icons.has(service?.icon)) errors.push(error('services.json', 'icon', 'Icon name is not supported.', id));
    if (typeof service?.whatsapp_message !== 'string' || !service.whatsapp_message.trim() || service.whatsapp_message.length > 500) errors.push(error('services.json', 'whatsapp_message', 'WhatsApp message must be a non-empty string under 500 characters.', id));
    if (typeof service?.featured !== 'boolean') errors.push(error('services.json', 'featured', 'Featured must be true or false.', id));
  });
  if (!Array.isArray(faqs?.faqs)) errors.push(error('faqs.json', 'faqs', 'FAQs must be an array.'));
  return {valid: errors.length === 0, errors, warnings, checked_at: new Date().toISOString()};
}
