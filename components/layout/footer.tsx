export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-black">
      <p>Manugly © {new Date().getFullYear()} - All rights reserved</p>
    </div>
  );
}
