export default function main(input) {
  const mf = (input.shop?.metafields || []).find(m => m.namespace === "global" && m.key === "tier_data");
  const orderTotal = parseFloat(input.order?.totalPriceSet?.shopMoney?.amount || 0);
  if (!mf) return { eligibleForGift: false };

  try {
    const data = JSON.parse(mf.value);
    if (!data.enable_tier_progress_bar || !Array.isArray(data.tier) || data.tier.length === 0) return { eligibleForGift: false };
    const minThreshold = Math.min(...data.tier.map(t => t.threshold || Infinity));
    return { eligibleForGift: orderTotal >= minThreshold };
  } catch {
    return { eligibleForGift: false };
  }
}
