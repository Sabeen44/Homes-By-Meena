import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const { name, email, phone, message } = await req.json();

  const lead = { name, email, phone, message, created_at: new Date().toISOString() };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log("Contact form submission:", lead);
    return Response.json({ success: true });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.from("contact_leads").insert([lead]);
  if (error) console.error("Supabase insert error:", error.message);

  return Response.json({ success: true });
}
