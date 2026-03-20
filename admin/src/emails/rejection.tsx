import {
  Html, Head, Body, Container, Section, Text, Hr, Link,
} from "@react-email/components";

interface RejectionEmailProps {
  customerName: string;
  reason: string;
}

export default function RejectionEmail({ customerName, reason }: RejectionEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0A0A0A", margin: 0, padding: 0, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 300, letterSpacing: "6px", textAlign: "center" as const, marginBottom: "32px" }}>
            A P E X
          </Text>

          <Section style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
            {/* Badge */}
            <div style={{ display: "inline-block", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "6px 14px", marginBottom: "20px" }}>
              <Text style={{ color: "#F59E0B", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" as const, fontWeight: 600, margin: 0 }}>
                Verification Update
              </Text>
            </div>

            <Text style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 500, marginBottom: "8px" }}>
              Hi {customerName},
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.7" }}>
              We were unable to verify your payment. Here&apos;s the reason:
            </Text>

            {/* Reason box */}
            <Section style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px", margin: "20px 0" }}>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: "1.6", margin: 0, fontStyle: "italic" }}>
                &ldquo;{reason}&rdquo;
              </Text>
            </Section>

            <Hr style={{ borderColor: "rgba(255,255,255,0.06)", margin: "24px 0" }} />

            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.7" }}>
              You can try again by visiting our website and submitting a new payment with the correct details. If you believe this is an error, please reach out to us.
            </Text>

            <Link
              href="https://apexagencyxo.vercel.app"
              style={{
                display: "block",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                textAlign: "center" as const,
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                marginTop: "20px",
                letterSpacing: "1px",
              }}
            >
              VISIT WEBSITE
            </Link>
          </Section>

          <Section style={{ marginTop: "32px", textAlign: "center" as const }}>
            <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "1px", margin: "0 0 12px" }}>
              APEX AGENCY
            </Text>
            <div style={{ marginBottom: "12px" }}>
              <Link href="https://apexagencyxo.vercel.app" style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", textDecoration: "none", marginRight: "16px" }}>
                Website
              </Link>
              <Link href="https://instagram.com/apexagency.xo" style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", textDecoration: "none", marginRight: "16px" }}>
                Instagram
              </Link>
              <Link href="https://apexagencyxo.vercel.app/#contact" style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", textDecoration: "none" }}>
                Contact
              </Link>
            </div>
            <Text style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px", margin: 0 }}>
              &copy; 2026 APEX Agency. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
