import { cn, Radio } from "@nextui-org/react";

export default function CustomRadio(props: any) {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content2 hover:bg-content3 items-center justify-between",
          "flex-row-reverse max-w-[1000px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary data-[selected=true]:bg-content1",
        ),
      }}
    >
      {children}
    </Radio>
  );
}
