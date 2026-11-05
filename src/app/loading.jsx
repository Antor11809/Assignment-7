
const Loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#f1f7f2]">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>

      <h2 className="text-lg font-semibold text-green-700 animate-pulse">
        পণ্য লোড হচ্ছে...
      </h2>

      <p className="text-sm text-gray-500">
        অনুগ্রহ করে একটু অপেক্ষা করুন
      </p>
    </div>
  );
};

export default Loading;
