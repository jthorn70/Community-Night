import { Image } from "@nextui-org/react";

export default function Home() {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Image
                showSkeleton
                width="100%"
                height="100%"
                maxDelay={10000}
                src="https://images.squarespace-cdn.com/content/5dae0fa47b94562285575e83/1571778626082-N2Q5ZFC622CK6L80JMMS/Community+Night.png?content-type=image%2Fpng"
                alt="Default Image"
            />
        </div>
    );
}
