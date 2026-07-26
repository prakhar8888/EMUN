import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// ======================================
// SHARED SENDER CONFIG
// ======================================
const FROM_ADDRESS = "Enigma MUN <onboarding@resend.dev>";

// ======================================
// CENTRALIZED SEND HELPER
// ======================================
// Every email function below funnels through this single point, so
// error handling, logging, and the return shape stay identical no
// matter which email is being sent. Adding a new email type later
// only requires writing the subject/HTML - never repeating this logic.
async function sendEmail({ to, subject, html, context }) {
  if (!to || typeof to !== "string" || !to.includes("@")) {
    console.error(`[Email] Rejected send - invalid recipient address for "${context}":`, to);
    return {
      emailSent: false,
      warning: "Invalid recipient email address.",
      error: "INVALID_RECIPIENT",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error(
      "========================================\n" +
      "❌ RESEND_API_KEY IS NOT CONFIGURED\n" +
      "   No email can be sent until this environment\n" +
      "   variable is set in backend/.env\n" +
      "========================================"
    );
    return {
      emailSent: false,
      warning: "Email service is not configured on the server.",
      error: "MISSING_API_KEY",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    });

    if (error) {
      console.warn(
        "========================================\n" +
        `⚠️  EMAIL DELIVERY FAILED (${context})\n` +
        `   Recipient: ${to}\n` +
        `   Reason: ${error.message}\n` +
        "   This is expected if you have not verified a real sending\n" +
        "   domain with Resend yet -- the free onboarding@resend.dev\n" +
        "   sender can only deliver to your own Resend account email.\n" +
        "========================================"
      );

      return {
        emailSent: false,
        warning: `${context} email could not be delivered (see server logs).`,
        error: error.message,
      };
    }

    console.log(`✅ [${context}] Email sent successfully to ${to}:`, data?.id || data);
    return { emailSent: true, data };

  } catch (error) {
    console.error(`[Email] Critical error sending "${context}" to ${to}:`, error);
    return {
      emailSent: false,
      warning: "Email service encountered an unexpected error.",
      error: error.message,
    };
  }
}

// ======================================
// SEND: APPLICATION RECEIVED (CONFIRMATION)
// ======================================
export const sendConfirmationEmail = async (userEmail, delegateName, chamberName) => {
  const safeName = delegateName?.trim() || "Delegate";
  const safeChamber = chamberName?.trim() || "your selected committee";

  return sendEmail({
    to: userEmail,
    subject: "Enigma MUN: Application Received",
    context: "Confirmation",
    html: `
      <p>Dear ${safeName},</p>
      <p>Thank you for applying to the <strong>${safeChamber}</strong> committee at Enigma MUN.</p>
      <p>Your application has been received and is currently under review by the Secretariat.
      You will receive another email as soon as a decision has been made.</p>
      <p>We appreciate your interest and look forward to reviewing your application.</p>
    `,
  });
};

// ======================================
// SEND: REGISTRATION STATUS (APPROVED / REJECTED)
// ======================================
export const sendRegistrationEmail = async (userEmail, delegateName, status, chamberName) => {
  const safeName = delegateName?.trim() || "Delegate";
  const safeChamber = chamberName?.trim() || "the committee";
  const isApproved = status === "APPROVED";

  return sendEmail({
    to: userEmail,
    subject: isApproved
      ? "Enigma MUN: Registration Approved! 🎉"
      : "Enigma MUN: Registration Update",
    context: "Registration Status",
    html: isApproved
      ? `<p>Dear ${safeName},</p>
         <p>Congratulations! Your registration for the <strong>${safeChamber}</strong> committee has been <strong>APPROVED</strong>.</p>
         <p>We look forward to seeing you at the summit.</p>`
      : `<p>Dear ${safeName},</p>
         <p>We regret to inform you that your registration for the <strong>${safeChamber}</strong> committee has been <strong>REJECTED</strong>.</p>
         <p>Thank you for your interest in Enigma MUN.</p>`,
  });
};

// ======================================
// SEND: PASSWORD RESET OTP
// ======================================
export const sendPasswordResetOtp = async (userEmail, fullName, otp) => {
  const safeName = fullName?.trim() || "Administrator";

  return sendEmail({
    to: userEmail,
    subject: "Enigma MUN: Your Password Reset Code",
    context: "Password Reset OTP",
    html: `
      <p>Dear ${safeName},</p>
      <p>We received a request to reset your Enigma MUN administrator password.</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">${otp}</p>
      <p>This code will expire in <strong>10 minutes</strong>. If you did not request this,
      you can safely ignore this email — your password will remain unchanged.</p>
      <p>Never share this code with anyone.</p>
    `,
  });
};

// ======================================
// SEND: EMAIL CHANGE VERIFICATION
// ======================================
// Sent to a NEW email address the user is trying to switch to,
// before the change actually takes effect - standard practice to
// confirm ownership of the new address and prevent lockouts or
// silent account hijacking.
export const sendEmailChangeVerification = async (newEmail, fullName, otp) => {
  const safeName = fullName?.trim() || "Administrator";

  return sendEmail({
    to: newEmail,
    subject: "Enigma MUN: Confirm Your New Email Address",
    context: "Email Change Verification",
    html: `
      <p>Dear ${safeName},</p>
      <p>You requested to change the email address on your Enigma MUN account to this one.</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">${otp}</p>
      <p>Enter this code to confirm the change. This code will expire in <strong>10 minutes</strong>.</p>
      <p>If you did not request this change, you can safely ignore this email — your
      current email address will remain unchanged.</p>
    `,
  });
};
