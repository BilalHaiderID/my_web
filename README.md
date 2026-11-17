# BH Digital Services

Static, frontend-only digital services catalogue for BH Digital Services / Bilal Haider ID. It uses HTML, CSS, vanilla JavaScript and public JSON files only. There is no login, backend, database or payment integration.

## cPanel deployment

1. Upload the contents of this folder into `public_html/` (or upload the ZIP and extract it there).
2. Ensure `index.html` is directly inside the public web folder.
3. Keep the `data/` and `assets/` folders in their original locations.
4. Open `https://bilalhaiderid.online/`. If JSON loading fails, use the HTTPS URL rather than opening `index.html` directly from your computer; browsers block `fetch()` for local files.

## Editing JSON

- **Change a price:** open `data/services.json`, find the service, and edit its numeric `price`.
- **Add a service:** add another object inside the `services` array. Give it a unique `id`, a category ID from `categories.json`, a supported `icon`, and all required fields shown in the existing examples.
- **Remove a service:** delete its complete object, including the comma separator.
- **Disable a service:** set `"available": false`. It remains visible when “Available only” is cleared but cannot be ordered.
- **Change details:** edit `name`, `description`, `price_unit`, `badge` or `whatsapp_message`.
- **Add a category:** add an object to `data/categories.json` with a unique `id`, then use that ID in services.
- **Feature a service:** set `"featured": true`.
- **Change quantity limits:** edit integer `min_quantity` and `max_quantity`; `max_quantity` cannot be lower than `min_quantity`.

Prices are sample guidance and are confirmed personally on WhatsApp. Never put passwords, API keys, customer data or private OTPs in public JSON.

## Validation and testing checklist

The site validates syntax indirectly through `response.json()` and validates required fields, types, duplicate IDs, category references, prices, quantities, icons, settings and WhatsApp messages before display. Invalid services are not rendered as cards, and diagnostic details are logged to the browser console.

- [ ] Homepage and all navigation pages load over HTTPS.
- [ ] Services and categories load from JSON after refresh.
- [ ] Search, category filter, availability filter and sorting work without reload.
- [ ] Service details and quantity limits work.
- [ ] Unavailable services cannot be ordered.
- [ ] WhatsApp links include the selected service and quantity.
- [ ] Mobile menu and responsive layouts work.
- [ ] Edit a JSON price, refresh, and confirm the new value appears.
- [ ] Temporarily introduce a duplicate ID or invalid price, refresh, and confirm the validation warning.

## Security notes

The catalogue is public by design. Dynamic JSON values are escaped before HTML rendering, no executable code is loaded from JSON, and WhatsApp links validate and encode their destination. This project intentionally does not collect credentials or provide account access, OTP interception, verification bypass, deceptive engagement or unauthorized subscriptions.
