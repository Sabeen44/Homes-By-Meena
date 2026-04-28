import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const body = await req.json();

  const { street, city, state, zip, beds, baths, sqft, condition, name, email, phone } = body;

  const lead = {
    address: `${street}, ${city}, ${state} ${zip}`.trim(),
    beds, baths, sqft, condition,
    name, email, phone,
    created_at: new Date().toISOString(),
  };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log("Home valuation lead (Supabase not configured):", lead);
    return Response.json({ success: true });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.from("seller_leads").insert([lead]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    // Still return success so the user sees the confirmation screen
  }

  return Response.json({ success: true });
}
