"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Builder } from "@builder.io/react";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8, textAlign: "center" }}>
      <h3 style={{ marginBottom: 15 }}>Sign In to Tango App</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            display: "block", 
            width: "100%", 
            padding: 10, 
            marginBottom: 10, 
            borderRadius: 4, 
            border: "1px solid #ddd" 
          }}
        />
        <button 
          disabled={loading} 
          style={{ 
            padding: "10px 20px", 
            background: loading ? "#ccc" : "black", 
            color: "white", 
            border: "none", 
            borderRadius: 4, 
            cursor: loading ? "not-allowed" : "pointer" 
          }}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
};

// This tells Builder.io: "Hey, let the user drag this component!"
Builder.registerComponent(AuthForm, {
  name: "Auth Form",
});
