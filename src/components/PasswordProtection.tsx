import React from "react";

interface PasswordProtectionProps {
    children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
    return <>{children}</>;
};

export default PasswordProtection;
