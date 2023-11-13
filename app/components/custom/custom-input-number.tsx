import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function CustomInputNumber({
  number,
  increment,
  decrement,
  set,
  showError,
}: {
  number: number;
  increment: any;
  decrement: any;
  set: any;
  showError?: boolean;
}) {
  return (
    <div className="flex flex-col relative items-end">
      <div
        className={`w-fit py-1 px-1 inline-block bg-default-100 rounded-lg ${
          showError ? "border-2 border-red-500" : ""
        }`}
      >
        <div className="flex items-center gap-x-1.5">
          <button
            type="button"
            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            onClick={decrement}
          >
            <IconMinus size={14} />
          </button>
          <input
            className="p-0 min-w-[1.5rem] max-w-[3rem] bg-transparent border-0 text-center"
            type="text"
            value={number}
            onChange={(event) => {
              set(parseInt(event.target.value));
            }}
          />
          <button
            type="button"
            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            onClick={increment}
          >
            <IconPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
