"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAuth } from "@/store/uiSlice";
import { useRouter } from "next/navigation";
import { signInAnonymously, signInWithGooglePopup } from "@/lib/firebase";
import { setError } from "@/store/authSlice";
import { signUpWithEmail, signInWithEmail } from "@/lib/firebase";

const AuthModalContent = ({ onClose }: { onClose: () => void }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    setIsLoadingEmail(true);
    try {
      if (isSignup) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
      router.push("/for-you");
    } catch (err: any) {
      console.error("Email auth error:", err);
      dispatch(setError(err?.code ?? err?.message ?? "Auth failed"));
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoadingGuest(true);
    try {
      await signInAnonymously();
      onClose();
      router.push("/for-you");
    } catch (err: any) {
      dispatch(setError(err?.message ?? "Guest login failed"));
    } finally {
      setIsLoadingGuest(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    try {
      await signInWithGooglePopup();
      onClose();
      router.push("/for-you");
    } catch (err: any) {
      dispatch(setError(err?.message ?? "Google login failed"));
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div
      className="auth-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div
        className="auth-modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 8,
          padding: 24,
          maxWidth: 480,
          width: "90%",
        }}
      >
        <div className="auth__content">
          <button
            className="auth__close--btn"
            aria-label="Close"
            type="button"
            onClick={onClose}
            style={{
              float: "right",
              fontSize: 20,
              border: "none",
              background: "transparent",
            }}
          >
            x
          </button>
          <h2 className="auth__title">Are you a Summarist?</h2>

          <button
            type="button"
            className="btn guest__btn--wrapper"
            onClick={handleGuestLogin}
            disabled={isLoadingGuest}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            {isLoadingGuest ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 50 50"
                  style={{ marginRight: 8 }}
                >
                  <path
                    d="M25 5a20 20 0 1 0 20 20"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    opacity="0.2"
                  />
                  <path
                    d="M25 5a20 20 0 0 1 20 20"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                  >
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
                <span>Logging in…</span>
              </>
            ) : (
              <>
                <figure className="google__icon--mask guest__icon--mask">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "8px" }}
                  >
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                </figure>
                <div>Login as Guest</div>
              </>
            )}
          </button>

          <div className="or">
            <span className="auth__separator--text">or</span>
          </div>

          <button
            type="button"
            className="btn google__btn--wrapper"
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            {isLoadingGoogle ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 50 50"
                  style={{ marginRight: 8 }}
                >
                  <path
                    d="M25 5a20 20 0 1 0 20 20"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    opacity="0.2"
                  />
                  <path
                    d="M25 5a20 20 0 0 1 20 20"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                  >
                    <animateTransform
                      attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
                <span>Logging in…</span>
              </>
            ) : (
              <>
                <img
                  src="/google.png"
                  alt="Google"
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "white",
                    borderRadius: 4,
                    padding: 2,
                  }}
                />
                <span>Login with Google</span>
              </>
            )}
          </button>

          <div className="or">
            <span className="auth__separator--text">or</span>
          </div>

          <form onSubmit={handleEmailSubmit}>
            <div className="auth__main--form">
              <input
                className="auth__main--input"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="auth__main--input"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isSignup && (
                <input
                  className="auth__main--input"
                  type="password"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              )}
              <button className="btn" type="submit" disabled={isLoadingEmail}>
                {isLoadingEmail
                  ? "Working…"
                  : isSignup
                  ? "Create account"
                  : "Login"}
              </button>
            </div>
          </form>
        </div>

        <div className="auth__forgot--password">
          <a href="#" style={{ cursor: "not-allowed" }}>
            Forgot your password?
          </a>
        </div>
        <button
          className="auth__switch--btn"
          style={{ cursor: "pointer" }}
          type="button"
          onClick={() => {
            setIsSignup((s) => !s);
            dispatch(setError(null));
          }}
        >
          {isSignup ? "Already have an account?" : "Don't have an account?"}
        </button>
      </div>
    </div>
  );
};

export default function AuthModal() {
  const open = useAppSelector((s) => s.ui.isAuthOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <AuthModalContent onClose={() => dispatch(closeAuth())} />,
    document.body
  );
}
