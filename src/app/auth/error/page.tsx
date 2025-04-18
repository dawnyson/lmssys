import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const errorMessages: Record<string, string> = {
        Configuration: "There is a problem with the server configuration.",
        AccessDenied: "You do not have permission to access this resource.",
        Verification: "The verification link is invalid or has expired.",
        OAuthCallback: "There was an error during the OAuth callback.",
        OAuthCreateAccount: "There was an error creating your account.",
        OAuthAccountNotLinked: "This account is not linked to any user.",
        EmailCreateAccount: "There was an error creating your account with email.",
        Callback: "There was an error during the callback process.",
        SessionRequired: "You must be signed in to access this page.",
        Default: "An unknown error occurred.",
    };

    return (
        <div>
            <h1>Error</h1>
            <p>{errorMessages[error || "Default"]}</p>
        </div>
    );
}