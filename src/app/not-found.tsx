import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
        <Icon icon="solar:danger-triangle-bold-duotone" />
      </div>
      <h1 className="text-3xl font-extrabold text-zinc-900 mb-3 tracking-tight">
        페이지를 찾을 수 없습니다 (404)
      </h1>
      <p className="text-zinc-500 max-w-md mb-8 leading-relaxed font-medium text-sm">
        찾으시려는 페이지가 삭제되었거나 주소가 잘못 입력되었습니다.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm"
      >
        <Icon icon="solar:home-2-bold-duotone" />
        <span>삼촌생각 홈으로 가기</span>
      </Link>
    </div>
  );
}
