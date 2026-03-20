import {
  Html, Head, Body, Container, Section, Text, Link, Hr,
} from "@react-email/components";

interface AdminNotificationProps {
  customerName: string;
  customerEmail: string;
  amount: string;
  currency: string;
  method: string;
  dashboardUrl: string;
}

export default function AdminNotificationEmail({
  customerName,
  customerEmail,
  amount,
  currency,
  method,
  dashboardUrl,
}: AdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0A0A0A", margin: 0, padding: 0, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 20px" }}>
          <Text style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 300, letterSpacing: "6px", textAlign: "center" as const, marginBottom: "32px" }}>
            A P E X
          </Text>

          <Section style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
            <div style={{ display: "inline-block", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "6px 14px", marginBottom: "20px" }}>
              <Text style={{ color: "#F59E0B", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" as const, fontWeight: 600, margin: 0 }}>
                New Order
              </Text>
            </div>

            <Text style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 500, margin: "0 0 4px" }}>
              {customerName}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: "0 0 24px" }}>
              {customerEmail}
            </Text>

            <Section style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tr>
                  <td style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Amount</td>
                  <td style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 600, textAlign: "right" as const, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{amount} {currency}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, padding: "10px 0" }}>Method</td>
                  <td style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", textAlign: "right" as const, padding: "10px 0" }}>{method}</td>
                </tr>
              </table>
            </Section>

            <Link
              href={`${dashboardUrl}/pending`}
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
                marginTop: "24px",
              }}
            >
              REVIEW ORDER
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
