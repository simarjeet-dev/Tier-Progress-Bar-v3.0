# Tier Progress Bar v3.0

#### Files
- `snippets/custom-tier-progress-bar.liquid`
- `snippets/custom-tier-progress-bar-script.liquid`
- `snippets/custom-tier-progress-bar-item.liquid`
- `sections/mini-cart.liquid`
- `layout/theme.liquid`
- `config/settings_schema.json`
  
#### Shop Metafield
`{{ shop.metafields.global.tier_data }}`
```
{
  "enable_tier_progress_bar": false,
  "tier_progress_type": "replace",
  "tier": [
    {
      "threshold": 700,
      "variant_id": 41370581041198,
      "product_handle": "hydrating-sunscreen-spf-50-pa-50ml-progress-bar-free-gift",
      "label": "Hydrating Sunscreen"
    },
    {
      "threshold": 1000,
      "variant_id": 41370580975662,
      "product_handle": "skai-aquatic-shower-gel-250ml-progress-bar-free-gift",
      "label": "Skai Shower Gel"
    },
    {
      "threshold": 1300,
      "variant_id": 41370579402798,
      "product_handle": "magnetic-him-mood-collection-gift-set-c-glow-face-wash",
      "label": "Perfume Gift Set"
    }
  ]
}
```
#### sections/mini-cart.liquid
 - Add to the Mini Cart header `</div>`
```
{% # Custom code for Tier Progress Bar functionality %}
{%- if settings.show_tier_progress_bar and shop.metafields.global.tier_data != blank -%}
  {% render 'custom-tier-progress-bar' %}
{%- endif -%}
{% # Custom code for Tier Progress Bar functionality ends here %}
```
 - Add to the Mini Cart items `</div>`
```
{% # custom code for Tier Progress Bar Free Item %}
{%- if settings.show_tier_progress_bar and shop.metafields.global.tier_data != blank -%}
  {% render 'custom-tier-progress-bar-item' %}
{% endif %}  
{% # custom code for Tier Progress Bar Free Item ends here %}
```
- Add to the Mini Cart checkout button `</div>`
```
{% # Custom checkout button for Tier Progress Bar preCheckoutCheck function %}
{%- if settings.show_tier_progress_bar and shop.metafields.global.tier_data != blank -%}
<button type="button" class="button skip-zecpe-handler" onclick="window.preCheckoutCheck(this)" data-skip-zecpe="true">
  {{ 'sections.cart.checkout' | t }}
  {%- if settings.disable_view_cart -%}
    <span class="price" id="mini-cart-subtotal">{{ cart.total_price | money_with_currency }}</span>
  {%- endif -%}
</button>
{%- else -%}
{% # Custom checkout button for Tier Progress Bar preCheckoutCheck function ends here %}
<button class="button" name="checkout" id="checkout" type="submit">
  {{ 'sections.cart.checkout' | t }}
  {%- if settings.disable_view_cart -%}
    <span class="price" id="mini-cart-subtotal">{{ cart.total_price | money_with_currency }}</span>
  {%- endif -%}
</button>
{%- endif -%}
```
#### layout/theme.liquid in `</body>`
```
{% # Custom code for Tier Progress Bar functionality %}
{%- if settings.show_tier_progress_bar and shop.metafields.global.tier_data != blank -%}
  {%- render 'custom-tier-progress-bar-script' -%}
{%- endif -%}
{% # Custom code for Tier Progress Bar functionality ends here %}
```
