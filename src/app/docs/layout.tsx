import LiveBlockProvider from "@/components/LiveBlockProvider";

export default function DocPageLayout ({
     children
    }: { children: React.ReactNode }) {
    return (
    <LiveBlockProvider>{children}</LiveBlockProvider>
    )
}