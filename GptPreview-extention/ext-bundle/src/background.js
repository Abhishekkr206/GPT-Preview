import { createClient } from "@supabase/supabase-js";

// Supabase config
const supabaseUrl = "https://fcpmffwoljugugmlxjmk.supabase.co";
const supabaseKey = "sb_publishable_ehJm9GuIAekAOjyNN-JL5g_L975IwVz";

// Create client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(" background service worker loaded");

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== "SAVE_CODE") return;

  console.log(" message received");

  ;(async () => {
    try {
      const { data, error } = await supabase
        .from("previews")
        .insert([{ code: message.payload.code }])
        .select()
        .single();

      if (error) {
        console.error(" supabase error:", error);
        sendResponse({ error: error.message });
        return;
      }

      console.log(" saved, id:", data.id);
      sendResponse({ previewID: data.id });
    } catch (err) {
      console.error(" unexpected error:", err);
      sendResponse({ error: "Unexpected error" });
    }
  })();

  // VERY IMPORTANT: keeps the message channel open
  return true;
});
