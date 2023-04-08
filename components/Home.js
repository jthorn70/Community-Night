import { Image } from "@nextui-org/react";

export default function Home() {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Image
                showSkeleton
                width="100%"
                height="100%"
                maxDelay={10000}
                src="https://img5.goodfon.com/original/2550x1800/8/1a/shtory-krasnye-zanaves.jpg"
                alt="Default Image"
            />
        </div>
    );
}
