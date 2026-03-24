import { createFileRoute } from "@tanstack/react-router";
import useVerifyEmail from "../hooks/useVerifyEmail";

const VerifyEmail = () => {
    const {isErrorVerifyingEmail} = useVerifyEmail();
    return <h1>{isErrorVerifyingEmail ? "Something Went Wrong": "Verifying Email ....."}</h1>
}

export const Route = createFileRoute('/VerifyEmail')({
    component: VerifyEmail,
  });

export default VerifyEmail;
