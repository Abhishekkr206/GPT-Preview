import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function Preview() {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  useEffect(() => {
    if (!id) {
      setError("No preview id found");
      return;
    }

    const fetchPreview = async () => {
      const { data, error } = await supabase
        .from("previews")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Preview expired or not found");
        return;
      }

      setHtml(`
        ${data.code || ""}
      `);
    };

    fetchPreview();
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <iframe
      title="preview"
      sandbox="allow-scripts"
      style={{ width: "100%", height: "100vh", border: "none" }}
      srcDoc={html}
    />
  );
}

export default Preview;
