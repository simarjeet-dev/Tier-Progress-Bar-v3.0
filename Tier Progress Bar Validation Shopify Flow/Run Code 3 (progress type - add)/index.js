export default function main(input) {
  const orderTotal = Number(input.order?.totalPriceSet?.shopMoney?.amount) || 0;
  const orderVariantIds = new Set(
    (input.order?.lineItems || [])
      .map(item => item.variant?.id?.split('/').pop())
      .filter(Boolean)
  );
  const metafields = input.shop?.metafields || [];

  // Find tier_data metafield in global namespace
  const tierMetafield = metafields.find(mf => mf.namespace === "global" && mf.key === "tier_data");
  if (!tierMetafield?.value) return generateEmptyOutput(0);

  let tierData;
  try {
    tierData = JSON.parse(tierMetafield.value);
  } catch {
    return generateEmptyOutput(0);
  }

  const tiers = tierData?.tier;
  if (!Array.isArray(tiers) || tiers.length === 0) return generateEmptyOutput(0);

  // Filter eligible tiers where orderTotal >= threshold, sorted ascending
  const eligibleTiers = tiers.filter(t => orderTotal >= t.threshold).sort((a, b) => a.threshold - b.threshold);

  const maxTiers = tiers.length;
  const output = {};

  for (let i = 0; i < maxTiers; i++) {
    if (i < eligibleTiers.length) {
      const variantId = String(eligibleTiers[i].variant_id);
      const isMissing = !orderVariantIds.has(variantId);
      output[`variant${i + 1}Missing`] = isMissing;
      output[`variant${i + 1}GID`] = `gid://shopify/ProductVariant/${variantId}`;
    } else {
      output[`variant${i + 1}Missing`] = false;
      output[`variant${i + 1}GID`] = "";
    }
  }

  return output;

  function generateEmptyOutput(count) {
    const emptyOutput = {};
    for (let i = 0; i < count; i++) {
      emptyOutput[`variant${i + 1}Missing`] = false;
      emptyOutput[`variant${i + 1}GID`] = "";
    }
    return emptyOutput;
  }
}
