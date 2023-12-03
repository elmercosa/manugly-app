import Image from "next/image";

export default function ManuglyIcon({
  width,
  height,
}: {
  width: any;
  height: any;
}) {
  return (
    <Image src="/manugly.svg" alt="Manugly" width={width} height={height} />
  );
}
