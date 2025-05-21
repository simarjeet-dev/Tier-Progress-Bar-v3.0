export default function main(input) {
  const mf = (input.shop?.metafields || []).find(m => m.namespace === "global" && m.key === "tier_data");

  if (!mf || !mf.value || mf.value.trim() === "") {
    return { enableProgressBar: false, tierType: "" };
  }

  try {
    const parsedData = JSON.parse(mf.value);

    if (!parsedData.tier || !Array.isArray(parsedData.tier) || parsedData.tier.length === 0) {
      return { enableProgressBar: false, tierType: "" };
    }

    if (!parsedData.enable_progress_bar || !parsedData.tier_type || parsedData.tier_type.trim() === "") {
      return { enableProgressBar: false, tierType: "" };
    }

    return {
      enableProgressBar: true,
      tierType: parsedData.tier_type,
    };
  } catch {
    return { enableProgressBar: false, tierType: "" };
  }
}
