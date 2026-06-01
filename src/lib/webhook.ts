export interface FormPayload {
  formType:
    | "brand_collaboration"
    | "guest_application"
    | "studio_booking"
    | "lead_generation"
    | "guest"
    | "sponsor"
    | "contact"
    | "studio-booking"
    | "event-booking"
    | "newsletter"
    | "hire";
  data: Record<string, string>;
  timestamp: string;
}

export async function submitLeadForm(
  formType: FormPayload["formType"],
  data: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;

  const payload: FormPayload = {
    formType,
    data,
    timestamp: new Date().toISOString(),
  };

  console.log(`[Webhook Submission Type: ${formType}]`, payload);

  if (!webhookUrl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          error: "NEXT_PUBLIC_LEAD_WEBHOOK_URL environment variable is missing. Simulated successful submission in local environment.",
        });
      }, 1200);
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Webhook POST Error:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred while transmitting your request.",
    };
  }
}
