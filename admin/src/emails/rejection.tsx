import {
  Html, Head, Body, Container, Section, Text, Hr,
} from "@react-email/components";

interface RejectionEmailProps {
  customerName: string;
  reason: string;
}

export default function RejectionEmail({ customerName, reason }: RejectionEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0A0A0A", margin: 0, padding: 0, fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 300, letterSpacing: "4px", textAlign: "center" as const, marginBottom: "32px" }}>
            APEX
          </Text>
          <Section style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "32px" }}>
            <Text style={{ color: "#F59E0B", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" as const, marginBottom: "8px" }}>
              Payment Verification Update
            </Text>
            <Text style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 400, marginBottom: "16px" }}>
              Hi {customerName},
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.6" }}>
              We were unable to verify your payment. Here's what happened:
            </Text>
            <Section style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", margin: "16px 0" }}>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", fontStyle: "italic" }}>
                "{reason}"
              </Text>
            </Section>
            <Hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" }} />
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.6" }}>
              You can try again by visiting our website and submitting a new payment. If you believe this is an error, please contact us.
            </Text>
          </Section>
          <Text style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", textAlign: "center" as const, marginTop: "32px" }}>
            APEX Agency — Premium Shopify Themes
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
