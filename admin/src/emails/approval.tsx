import {
  Html, Head, Body, Container, Section, Text, Link, Hr, Img,
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
      <Body style={{ backgroundColor: "#0A0A0A", margin: 0, padding: 0, fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 300, letterSpacing: "4px", textAlign: "center" as const, marginBottom: "32px" }}>
            APEX
          </Text>
          <Section style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "32px" }}>
            <Text style={{ color: "#22C55E", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" as const, marginBottom: "8px" }}>
              Payment Confirmed
            </Text>
            <Text style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 400, marginBottom: "16px" }}>
              Hi {customerName},
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.6" }}>
              Your payment has been verified. Your APEX Pro Theme is ready for download.
            </Text>
            <Hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "24px 0" }} />
            <Link
              href={downloadUrl}
              style={{
                display: "block",
                backgroundColor: "#FFFFFF",
                color: "#0A0A0A",
                textAlign: "center" as const,
                padding: "14px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
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
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 400,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.08)",
                marginTop: "12px",
              }}
            >
              DOWNLOAD MANUAL
            </Link>
            <Text style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", textAlign: "center" as const, marginTop: "16px" }}>
              These links expire in 48 hours.
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
