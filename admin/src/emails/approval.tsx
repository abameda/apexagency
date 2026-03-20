import {
  Html, Head, Body, Container, Section, Text, Link, Hr,
} from "@react-email/components";

interface ApprovalEmailProps {
  customerName: string;
  downloadUrl: string;
  manualUrl: string;
}

export default function ApprovalEmail({ customerName, downloadUrl, manualUrl }: ApprovalEmailProps) {
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
            <div style={{ display: "inline-block", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "8px", padding: "6px 14px", marginBottom: "20px" }}>
              <Text style={{ color: "#22C55E", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" as const, fontWeight: 600, margin: 0 }}>
                Payment Confirmed
              </Text>
            </div>

            <Text style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 500, marginBottom: "8px" }}>
              Hi {customerName},
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.7" }}>
              Your payment has been verified and approved. Your APEX Pro Theme is ready — download it below and start building.
            </Text>

            <Hr style={{ borderColor: "rgba(255,255,255,0.06)", margin: "28px 0" }} />

            {/* Download buttons */}
            <Link
              href={downloadUrl}
              style={{
                display: "block",
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
                textAlign: "center" as const,
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "1px",
              }}
            >
              DOWNLOAD THEME
            </Link>
            <Link
              href={manualUrl}
              style={{
                display: "block",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                textAlign: "center" as const,
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 400,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                marginTop: "12px",
                letterSpacing: "1px",
              }}
            >
              DOWNLOAD MANUAL
            </Link>

            <Text style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", textAlign: "center" as const, marginTop: "20px" }}>
              Links expire in 48 hours. Contact us if you need them resent.
            </Text>
          </Section>

          <Text style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", textAlign: "center" as const, marginTop: "32px", letterSpacing: "1px" }}>
            APEX AGENCY
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
